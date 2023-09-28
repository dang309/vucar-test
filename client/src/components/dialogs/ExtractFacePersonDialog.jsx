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
import { motion } from "framer-motion";
import _ from "lodash";
import { enqueueSnackbar } from "notistack";
import { useSWRConfig } from "swr";
import { v4 as uuidv4 } from "uuid";

import { AssetAPI, FaceAPI, ModelAPI, PersonAPI } from "src/api";
import { useEventBus, useLocales, useSocketIO } from "src/hooks";
import { MODEL_TYPE } from "src/utils/constant";

import { DialogAnimate } from "../animate";

const ExtractFaceDialog = (props) => {
  const { showPerson, showUpload } = props;
  const { $on, $remove, $emit } = useEventBus();
  const { socket } = useSocketIO();

  const { t } = useLocales();
  const { mutate } = useSWRConfig();

  const [assetId, setAssetId] = useState();
  const [personId, setPersonId] = useState();
  const [personName, setPersonName] = useState();
  const [systemId, setSystemId] = useState();
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
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  const loadData = () => {
    setIsLoading(true);

    Promise.all([
      ModelAPI.getAll({ pageSize: 999, isActivated: 1 }).then((res) => {
        if (res.status === 200) {
          return res.data.data.items;
        }
        return [];
      }),
    ])
      .then(([models]) => {
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
    setUploadedFile();
    setPreview();
    setOpen(false);
    setOpen(false);
  };

  const handleChangeURL = (e) => {
    setUrl(e.target.value);
    setPreview(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      const uuid = uuidv4();
      formData.append("id", uuid);
      formData.append("assetId", uuid);
      formData.append("systemId", systemId);
      setAssetId(uuid);
  
      setIsSubmitting(true);
      const originalName = url.split('/').pop();
  
      if (!url) {
        throw new Error(t("NOTI.CHOOSE_URL"));
      }
  
      formData.append("url", url);
  

      const checkAsset  = await AssetAPI.getAll({originalName}).then(async data => {
        if(data.data.data.currentItemCount > 0){
          setAssetId(data.data.data.items[0].assetId);
          await initiateExtraction(data.data.data.items[0].assetId);
        }else {
          const uploadResponse = await AssetAPI.uploadByUrl(formData).then(async res => {
            setAssetId(res.data.data.assetId);
            mutate((key) => typeof key === "string" && key.startsWith("/assets"));
          // setAssetId(uploadResponse.data.data.assetId);
          await initiateExtraction(res.data.data.assetId);
          });
        }
      });
      //await initiateExtraction(uploadResponse.data.data.assetId);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  };
  
  const initiateExtraction = async (assetId) => {
    if (!selectedFaceDetector) {
      throw new Error(t("NOTI.CHOOSE_FACE_DETECTOR"));
    }
  
    if (!selectedFaceDescriptor) {
      throw new Error(t("NOTI.CHOOSE_FACE_DESCRIPTOR"));
    }
  
    const dataToSend = {
      faceDetectorModel: selectedFaceDetector.alias,
      faceDescriptorModel: selectedFaceDescriptor.alias,
      personId,
      personName,
      isIndex: isIndexing,
      callback,
    };
  
    setIsSubmitting(true);
  
    const extractResponse = await AssetAPI.extractFace(assetId, dataToSend);
  
    if (extractResponse?.data?.data?.id) {
      let faces = [];
      const path = extractResponse.data.data.assetPath;
  
      socket.on("extract-face/done", async () => {
        const facesResponse = await FaceAPI.getFacesOfAsset(assetId);
        faces = facesResponse.data.data.items;
        handlePreview(path, faces);
        handleClose();
      });
    }
  
    setIsSubmitting(false);
  };
  
  const handleExtract = async () => {
    if (showUpload) {
      await handleUpload();
    }
  };
  

  useEffect(() => {
    $on("dialog/extract-face/open", ({ personId, systemId, personName }) => {
      setPersonId(personId);
      setPersonName(personName);
      setSystemId(systemId);
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
            {!isLoading && (
              <TextField
              fullWidth
              label={t("LABEL.PERSON")}
              value={personName}
              disabled={true}
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
          {
            showUpload && <Grid item lg={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label={t('LABEL.URL')}
              value={url}
              onChange={handleChangeURL}
            />
            {url && (
              <motion.img
                loading="lazy"
                alt="url"
                src={_.isString(url) && url}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}{" "}
        </Grid>
          }
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
