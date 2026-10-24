import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";

import SectionHeading from "../../components/common/SectionHeading";
import videos, { youtubeChannelUrl } from "../../data/videos";
import {
  fetchYoutubeTitle,
  warmUpYoutube,
  youtubeEmbedUrl,
  youtubeId,
  youtubeThumbnail,
  youtubeVideoUrl,
} from "../../lib/youtube";

// Each entry is a plain link or { url, fullVideo, title }. Links that could
// not be read are skipped rather than breaking the page.
const playableVideos = videos
  .map((video) => (typeof video === "string" ? { url: video } : video))
  .map((video) => ({
    ...video,
    id: youtubeId(video.url),
    fullVideoId: video.fullVideo ? youtubeId(video.fullVideo) : null,
  }))
  .filter((video) => video.id);

const coverSx = { position: "absolute", inset: 0, width: "100%", height: "100%" };

// A title written in videos.js wins; otherwise the YouTube title is fetched.
function useVideoTitle(id, manualTitle) {
  const [fetchedTitle, setFetchedTitle] = useState(null);

  useEffect(() => {
    if (manualTitle || !id) return;
    let active = true;
    fetchYoutubeTitle(id).then((title) => {
      if (active) setFetchedTitle(title);
    });
    return () => {
      active = false;
    };
  }, [id, manualTitle]);

  return manualTitle || fetchedTitle;
}

function VideoCard({ video, playing, onPlay, onWatchFull }) {
  // The full message opens on YouTube; the short itself plays on the page.
  const title = useVideoTitle(video.id, video.title);

  return (
    <>
      <ShortPlayer video={{ ...video, title }} playing={playing} onPlay={onPlay} />
      {title && (
        <Typography
          sx={{
            mt: 1.5,
            fontWeight: 600,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
      )}
      {video.fullVideoId && (
        <Button
          href={youtubeVideoUrl(video.fullVideoId)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWatchFull}
          variant="outlined"
          size="small"
          startIcon={<OndemandVideoOutlinedIcon />}
          endIcon={<OpenInNewIcon sx={{ fontSize: "16px !important" }} />}
          fullWidth
          sx={{ mt: 1.5, py: 0.75 }}
        >
          Watch full message
        </Button>
      )}
    </>
  );
}

const badgeSx = {
  position: "absolute",
  width: 64,
  height: 64,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  color: "white",
  bgcolor: "rgba(0,0,0,0.6)",
};

// The YouTube player, with the thumbnail and a spinner kept on top until the
// player has loaded so the card never sits there as a blank black box.
function PlayingFrame({ video }) {
  const [ready, setReady] = useState(false);
  const frameRef = useRef(null);

  // Listen on the element itself; the overlay also lifts after a few seconds
  // in case the load event is missed, so it can never hide the video.
  useEffect(() => {
    const frame = frameRef.current;
    const markReady = () => setReady(true);
    frame?.addEventListener("load", markReady);
    const fallback = setTimeout(markReady, 4000);
    return () => {
      frame?.removeEventListener("load", markReady);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <Box
        component="iframe"
        ref={frameRef}
        src={youtubeEmbedUrl(video.id)}
        title={video.title || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sx={{ ...coverSx, border: 0 }}
      />
      <Box
        aria-hidden
        sx={{
          ...coverSx,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          opacity: ready ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <Box
          component="img"
          src={youtubeThumbnail(video.id)}
          alt=""
          sx={{ ...coverSx, objectFit: "cover" }}
        />
        <Box sx={badgeSx}>
          <CircularProgress size={34} thickness={4} sx={{ color: "white" }} />
        </Box>
      </Box>
    </>
  );
}

// Shows the thumbnail until clicked, then the player. Hovering or touching the
// card opens the connections to YouTube early so playback starts sooner.
function ShortPlayer({ video, playing, onPlay }) {
  const label = video.title ? `Play ${video.title}` : "Play video";

  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: "9 / 16",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#000",
        boxShadow: "0 14px 35px rgba(23,45,34,0.18)",
      }}
    >
      {playing ? (
        <PlayingFrame video={video} />
      ) : (
        <ButtonBase
          onClick={onPlay}
          onMouseEnter={warmUpYoutube}
          onTouchStart={warmUpYoutube}
          onFocus={warmUpYoutube}
          aria-label={label}
          sx={{
            ...coverSx,
            "&:hover .play-badge": { transform: "scale(1.08)", bgcolor: "#FF0000" },
          }}
        >
          <Box
            component="img"
            src={youtubeThumbnail(video.id)}
            alt=""
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            className="play-badge"
            sx={{ ...badgeSx, transition: "transform 0.2s, background-color 0.2s" }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 44 }} />
          </Box>
        </ButtonBase>
      )}
    </Box>
  );
}

function ComingSoon() {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        textAlign: "center",
        py: { xs: 6, md: 8 },
        px: 3,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <SmartDisplayOutlinedIcon sx={{ fontSize: 56, color: "secondary.main" }} />
      <Typography
        sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 26, color: "primary.dark" }}
      >
        Videos are coming soon
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 460, lineHeight: 1.8 }}>
        Short messages from our ministry will appear here. Meanwhile, you can watch them on
        our YouTube channel.
      </Typography>
    </Stack>
  );
}

export default function VideosSection() {
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    if (playableVideos.length) warmUpYoutube();
  }, []);

  return (
    <Box id="videos" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="WATCH & LISTEN"
          title="Short messages from God's Word."
          description="Brief, Scripture-centred messages to encourage you through the week. Tap a video to play it."
        />

        {playableVideos.length ? (
          <Grid container spacing={3}>
            {playableVideos.map((video) => (
              <Grid key={video.id} size={{ xs: 6, sm: 4, md: 3 }}>
                <VideoCard
                  video={video}
                  playing={playingId === video.id}
                  onPlay={() => setPlayingId(video.id)}
                  onWatchFull={() => setPlayingId(null)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <ComingSoon />
        )}

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<YouTubeIcon />}
          >
            Watch more on YouTube
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
