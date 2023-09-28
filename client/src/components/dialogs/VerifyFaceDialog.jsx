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
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Switch,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { AssetAPI, ModelAPI, PersonAPI } from "src/api";
import { useEventBus, useLocales } from "src/hooks";
import { MODEL_TYPE } from "src/utils/constant";

import { DialogAnimate } from "../animate";

const VerifyFaceDialog = () => {
  const { $on, $remove } = useEventBus();

  const { t } = useLocales();

  const [assetId, setAssetId] = useState();
  const [faceDetectorOptions, setFaceDetectorOptions] = useState();
  const [faceDescriptorOptions, setFaceDescriptorOptions] = useState();
  const [personOptions, setPersonOptions] = useState();
  const [selectedFaceDetector, setSelectedFaceDetector] = useState();
  const [selectedFaceDescriptor, setSelectedFaceDescriptor] = useState();
  const [selectedPerson, setSelectedPerson] = useState();
  const [isIndexing, setIsIndexing] = useState(false);
  const [similarityMetric, setSimilarityMetric] = useState("cosine");
  const [distanceThreshold, setDistanceThreshold] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = () => {
    setIsLoading(true);

    Promise.all([
      ModelAPI.getAll({ pageSize: 999 }).then((res) => {
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

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSimilarityMetric = (e) => {
    setSimilarityMetric(e.target.value);
  };

  const handleChangeDistanceThreshold = (e) => {
    setDistanceThreshold(e.target.value);
  };

  const handleVerify = async () => {
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
      similarityMetric,
      distanceThreshold: parseFloat(distanceThreshold),
      personId: selectedPerson.id,
      personName: selectedPerson.name,
      isIndex: isIndexing,
    };

    setIsSubmitting(true);

    return AssetAPI.verifyFace(assetId, dataToSend)
      .then(() => {
        handleClose();
      })
      .catch((err) => err)
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    $on("dialog/verify-face/open", ({ assetId }) => {
      setAssetId(assetId);
      handleOpen();
    });

    $on("dialog/verify-face/close", () => {
      handleClose();
    });

    return () => {
      $remove("dialog/verify-face/open");
      $remove("dialog/verify-face/close");
    };
  }, [$on, $remove]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DialogAnimate open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("DIALOG.TITLE.VERIFY_FACE")}</DialogTitle>
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

          <Grid item lg={6} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && (
              <FormControl fullWidth>
                <InputLabel>Similarity Metric</InputLabel>
                <Select
                  label="Similarity Metric"
                  fullWidth
                  value={similarityMetric}
                  onChange={handleChangeSimilarityMetric}
                >
                  <MenuItem value="cosine">cosine</MenuItem>
                  <MenuItem value="l1">l1</MenuItem>
                  <MenuItem value="l2">l2</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>

          <Grid item lg={6} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && (
              <TextField
                label="Distance Threshold"
                fullWidth
                value={distanceThreshold}
                onChange={handleChangeDistanceThreshold}
                InputProps={{
                  type: "number",
                }}
              />
            )}
          </Grid>

          <Grid item lg={6} sm={12} xs={12}>
            {isLoading && <Skeleton />}
            {!isLoading && personOptions && (
              <Autocomplete
                options={personOptions}
                getOptionLabel={(option) => option.name}
                value={selectedPerson}
                onChange={(_, newValue) => {
                  setSelectedPerson(newValue);
                }}
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

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t("BUTTON.CANCEL")}
        </Button>
        <LoadingButton
          loading={isSubmitting}
          onClick={handleVerify}
          variant="contained"
        >
          {t("BUTTON.VERIFY")}
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
};

export default VerifyFaceDialog;
