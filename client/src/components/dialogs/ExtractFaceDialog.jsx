// material
import { useState } from "react";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Skeleton,
  Switch,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { AssetAPI, FaceAPI, ModelAPI, PersonAPI } from "src/api";
import { useEventBus, useLocales, useSocketIO } from "src/hooks";
import { MODEL_TYPE } from "src/utils/constant";

import { DialogAnimate } from "../animate";

const ExtractFaceDialog = (props) => {
  const { showPerson } = props;
  const { $on, $remove, $emit } = useEventBus();
  const { socket } = useSocketIO();


  const { t } = useLocales();

  const [assetId, setAssetId] = useState();
  const [faceDetectorOptions, setFaceDetectorOptions] = useState();
  const [faceDescriptorOptions, setFaceDescriptorOptions] = useState();
  const [personOptions, setPersonOptions] = useState();
  const [selectedFaceDetector, setSelectedFaceDetector] = useState();
  const [selectedFaceDescriptor, setSelectedFaceDescriptor] = useState();
  const [selectedPerson, setSelectedPerson] = useState();
  const [isIndexing, setIsIndexing] = useState(false);
  const [callback, setCallback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = () => {
    setIsLoading(true);

    Promise.all([
      ModelAPI.getAll({ pageSize: 999, isActivated: 1 }).then((res) => {
        if (res.status === 200) {
          return res.data.data.items;
        }
        return [];
      }),
      PersonAPI.getAll({ pageSize: 999 }).then((res) => {
        if (res.status === 200) {
          return res.data.data.items;
        }
        return [];
      }),
    ])
      .then(([models, people]) => {
        if (models) {
          let faceDetetors = models.filter(
            (opt) => opt.type === MODEL_TYPE.FACE_DETECTOR
          );
          let faceDescriptors = models.filter(
            (opt) => opt.type === MODEL_TYPE.FACE_DESCRIPTOR
          );
          const defaultFaceDetector = faceDetetors.find((opt) => opt.isDefault);
          const defaultFaceDescriptor = faceDescriptors.find(
            (opt) => opt.isDefault
          );
          setSelectedFaceDetector(defaultFaceDetector);
          setSelectedFaceDescriptor(defaultFaceDescriptor);
          setFaceDetectorOptions(faceDetetors);
          setFaceDescriptorOptions(faceDescriptors);
        }

        if (people) {
          const defaultPerson = people.find((opt) => opt.isDefault);
          setSelectedPerson(defaultPerson);
          setPersonOptions(people);
        }
      })
      .catch((err) => err)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePreview = (path, faces) => {
    const src = `${import.meta.env.VITE_API_ROOT}/${path}`;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      $emit("dialog/gallery/open", { image: src, faces });
    };
    image.onerror = () => {
      $emit("dialog/gallery/open", {
        image: `${import.meta.env.BASE_URL}/static/placeholder.svg`,
        faces: null,
      });
    };
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExtract = async () => {
    if (!assetId) return;
    if (!selectedFaceDetector)
      return enqueueSnackbar(t("NOTI.CHOOSE_FACE_DETECTOR"), {
        variant: "error",
      });
    if (!selectedFaceDescriptor)
      return enqueueSnackbar(t("NOTI.CHOOSE_FACE_DESCRIPTOR"), {
        variant: "error",
      });

    const dataToSend = {
      faceDetectorModel: selectedFaceDetector.alias,
      faceDescriptorModel: selectedFaceDescriptor.alias,
      personId: selectedPerson.id,
      personName: selectedPerson.name,
      isIndex: isIndexing,
      callback,
    };

    setIsSubmitting(true);

    return AssetAPI.extractFace(assetId, dataToSend)
      .then((res) => {
        if(res?.data?.data?.id){
          let faces = [];
          const path = res.data.data.assetPath;
          socket.on("extract-face/done", () => {
            FaceAPI.getFacesOfAsset(assetId).then((res) => {
              faces = res.data.data.items;
              handlePreview(path, faces)
           });
          });
        }
        handleClose();
      })
      .catch((err) => err)
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    $on("dialog/extract-face/open", ({ assetId }) => {
      setAssetId(assetId);
      handleOpen();
    });

    $on("dialog/extract-face/close", () => {
      handleClose();
    });

    return () => {
      $remove("dialog/extract-face/open");
      $remove("dialog/extract-face/close");
    };
  }, [$on, $remove]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DialogAnimate open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("DIALOG.TITLE.EXTRACT_FACE")}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && faceDetectorOptions && (
              <Autocomplete
                options={faceDetectorOptions}
                getOptionLabel={(option) => option.title}
                value={selectedFaceDetector}
                onChange={(_, newValue) => {
                  setSelectedFaceDetector(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("LABEL.FACE_DETECTOR")}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "disabled", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            )}
          </Grid>

          <Grid item lg={12} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && faceDescriptorOptions && (
              <Autocomplete
                options={faceDescriptorOptions}
                getOptionLabel={(option) => option.title}
                value={selectedFaceDescriptor}
                onChange={(_, newValue) => {
                  setSelectedFaceDescriptor(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("LABEL.FACE_DESCRIPTOR")}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "disabled", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            )}
          </Grid>

          <Grid item lg={12} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && personOptions && (
              <Autocomplete
                options={personOptions}
                getOptionLabel={(option) => option.name}
                value={selectedPerson}
                onChange={(_, newValue) => {
                  setSelectedPerson(newValue);
                }}
                disabled={!showPerson}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("LABEL.PERSON")}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "disabled", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            )}
          </Grid>

          {/* <Grid item lg={6} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && (
              <FormControlLabel
                control={
                  <Switch
                    value={isIndexing}
                    onChange={(e) => setIsIndexing(e.target.checked)}
                  />
                }
                label="Indexing?"
              />
            )}
          </Grid> */}

          <Grid item lg={12} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && (
              <TextField
                fullWidth
                label="Callback"
                value={callback}
                onChange={(e) => setCallback(e.target.value)}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t("BUTTON.CANCEL")}
        </Button>
        <LoadingButton
          loading={isSubmitting}
          onClick={handleExtract}
          variant="contained"
        >
          {t("BUTTON.EXTRACT")}
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
};

export default ExtractFaceDialog;
