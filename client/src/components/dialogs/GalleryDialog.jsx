// material
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogContent,
  DialogTitle,
  Drawer,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion, useMotionValue } from "framer-motion";
import _ from "lodash";

import { useEventBus, useLocales } from "src/hooks";

import { MIconButton } from "../@material-extend";
import { DialogAnimate } from "../animate";
import Iconify from "../Iconify";

const GalleryDialog = () => {
  const { $on, $remove } = useEventBus();

  const { t } = useLocales();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [open, setOpen] = useState(false);
  const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false);
  const [image, setImage] = useState();
  const [faces, setFaces] = useState();
  const [faceId, setFaceId] = useState(); // Because we use this dialog for Asset and Face, so if we open this dialog in Face table, we have to assign face's id to the selected face
  const [rotateAngle, setRotateAngle] = useState(0);
  const [rotateAngleBox, setRotateAngleBox] = useState(0);
  const [scaleRate, setScaleRate] = useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const handleCloseDrawer = () => {
    setShouldOpenDrawer(false);
  };

  const handleShowFaces = () => {
    setShouldOpenDrawer(true);
  };

  const handleRotateLeft = () => {
    setRotateAngle((prev) => prev - 90);
    // setRotateAngleBox((prev) => prev + 90);
  };

  const handleRotateRight = () => {
    setRotateAngle((prev) => prev + 90);
    // setRotateAngleBox((prev) => prev - 90);
  };

  const handleZoomIn = () => {
    if (scaleRate >= 2) return;
    setScaleRate((prev) => prev + 0.2);
  };

  const handleZoomOut = () => {
    if (scaleRate <= 0.8) return;
    setScaleRate((prev) => prev - 0.2);
  };

  const handleReset = () => {
    setRotateAngle(0);
    setRotateAngleBox(0);
    setScaleRate(1);
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    $on("dialog/gallery/open", ({ image, faces, faceId }) => {
      if (image) {
        setImage(image);
      }
      if (faces) {
        setFaces(faces);
      }
      if (faceId) {
        setFaceId(faceId);
      }
      handleOpen();
    });

    $on("dialog/gallery/close", () => {
      handleClose();
    });

    return () => {
      $remove("dialog/gallery/open");
      $remove("dialog/gallery/close");
    };
  }, [$on, $remove]);

  useEffect(() => {
    const canvas = document.getElementById("image-preview-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = document.getElementById("image-preview");
      ctx.drawImage(img);

      ctx.beginPath();
      ctx.rect(188, 50, 200, 100);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.lineWidth = 7;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }, []);

  return (
    <DialogAnimate fullScreen open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" component="h6">
            {t("DIALOG.TITLE.PREVIEW")}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Button
              variant="outlined"
              sx={{ mr: 1 }}
              startIcon={
                <Iconify
                  icon="eva:smiling-face-outline"
                  height={24}
                  width={24}
                />
              }
              onClick={handleShowFaces}
            >
              {t("BUTTON.SHOW_FACE")}
            </Button>

            <Tooltip title={t("BUTTON.RESET")} arrow>
              <MIconButton onClick={handleReset}>
                <Iconify
                  icon="material-symbols:reset-image-outline-rounded"
                  height={24}
                  width={24}
                />
              </MIconButton>
            </Tooltip>

            <Tooltip title={t("BUTTON.ROTATE_LEFT")} arrow>
              <MIconButton onClick={handleRotateLeft}>
                <Iconify
                  icon="material-symbols:rotate-left"
                  height={24}
                  width={24}
                />
              </MIconButton>
            </Tooltip>
            <Tooltip title={t("BUTTON.ROTATE_RIGHT")} arrow>
              <MIconButton onClick={handleRotateRight}>
                <Iconify
                  icon="material-symbols:rotate-right"
                  height={24}
                  width={24}
                />
              </MIconButton>
            </Tooltip>

            <Tooltip title={t("BUTTON.ZOOM_IN")} arrow>
              <MIconButton onClick={handleZoomIn} disabled={scaleRate >= 2}>
                <Iconify icon="eva:maximize-outline" height={24} width={24} />
              </MIconButton>
            </Tooltip>

            <Tooltip title={t("BUTTON.ZOOM_OUT")} arrow>
              <MIconButton onClick={handleZoomOut} disabled={scaleRate <= 0.8}>
                <Iconify icon="eva:minimize-outline" height={24} width={24} />
              </MIconButton>
            </Tooltip>

            <Tooltip title={t("BUTTON.CLOSE")} arrow>
              <MIconButton onClick={handleClose}>
                <Iconify icon="eva:close-outline" height={24} width={24} />
              </MIconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ maxHeight: "100%" }}>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Stack direction="row" justifyContent="center" sx={{ flex: 1 }}>
            <Box
              sx={{
                position: "relative",
                transform: `rotate(${rotateAngle}deg)`,
                width: "max-content",
              }}
            >
              {image && (
                <motion.img
                  id="image-preview"
                  drag={false}
                  dragMomentum={false}
                  animate={{
                    rotate: rotateAngleBox,
                    scale: scaleRate,
                  }}
                  src={image}
                  alt=""
                  style={{
                    x,
                    y,
                  }}
                />
              )}

              {faces &&
                faces.map((face, index) => {
                  const isSelectedFace = faceId && face.id === faceId;
                  return (
                    <motion.div
                      key={index}
                      animate={{
                        opacity: isSelectedFace ? 1 : 0.5,
                        scale: scaleRate,
                        rotate: rotateAngle,
                      }}
                      style={{
                        position: "absolute",
                        left: face.posX,
                        top: face.posY,
                        zIndex: 99,
                        width: face.width,
                        height: face.height,
                        border: `4px ${isSelectedFace ? "solid" : "dashed"} ${
                          isSelectedFace ? "green" : "yellow"
                        }`,
                      }}
                    />
                  );
                })}
            </Box>
          </Stack>
        </Stack>
        <Drawer
          components={Card}
          anchor="right"
          onClose={handleCloseDrawer}
          open={shouldOpenDrawer}
          sx={{ zIndex: 9999 }}
        >
          <CardHeader title="Faces" />
          <CardContent sx={{ width: 256 }}>
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {faces &&
                faces.map((face, index) => {
                  const isSelectedFace = faceId && face.id === faceId;

                  return (
                    <Box
                      key={index}
                      sx={{
                        width: "calc(33.33% - 8px)",
                        borderRadius: "16px",
                        border: isSelectedFace ? "1px solid green" : "none",
                        // flex: "1 0 calc(33.33% - 8px)",
                      }}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_ROOT}/${face.path}`}
                        alt={face.id}
                        style={{
                          borderRadius: "16px",
                        }}
                      />
                    </Box>
                  );
                })}
            </Stack>
          </CardContent>
        </Drawer>
      </DialogContent>
    </DialogAnimate>
  );
};

export default GalleryDialog;
