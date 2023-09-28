// material
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import _ from "lodash";
import { enqueueSnackbar } from "notistack";
import { useSWRConfig } from "swr";
import { v4 as uuidv4 } from "uuid";

import { AssetAPI, SystemAPI } from "src/api";
import { useEventBus, useLocales } from "src/hooks";
import { UPLOAD_TYPE } from "src/utils/constant";

import { DialogAnimate } from "../animate";
import { UploadSingleFile } from "../upload";

const UploadAssetDialog = () => {
  const { $on, $remove } = useEventBus();

  const { t } = useLocales();

  const { mutate } = useSWRConfig();

  const [systemOptions, setSystemOptions] = useState();
  const [selectedSystem, setSelectedSystem] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadType, setUploadType] = useState(UPLOAD_TYPE.COMPUTER);
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = () => {
    setIsLoading(true);

    SystemAPI.getAll()
      .then((res) => {
        if (res.status === 200) {
          let system = res.data.data.items;
          setSystemOptions(system);
          setSelectedSystem(system.find((opt) => opt.name === "sface-engine"));
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
    setUploadedFile();
    setPreview();
    setOpen(false);
  };

  const handleChangeUploadType = (e) => {
    setUploadType(e.target.value);
  };

  const handleChangeURL = (e) => {
    setUrl(e.target.value);
    setPreview(e.target.value);
  };

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedSystem)
      return enqueueSnackbar(t("NOTI.CHOOSE_SYSTEM"), { variant: "error" });

    const formData = new FormData();
    const uuid = uuidv4();
    formData.append("systemId", selectedSystem.id);
    formData.append("id", uuid);
    formData.append("assetId", uuid);

    setIsSubmitting(true);

    if (uploadType === UPLOAD_TYPE.COMPUTER) {
      if (!uploadedFile)
        return enqueueSnackbar(t("NOTI.CHOOSE_IMAGE"), { variant: "error" });
      formData.append("image", uploadedFile);
      return AssetAPI.uploadFromComputer(formData)
        .then(() => {
          mutate((key) => typeof key === "string" && key.startsWith("/assets"));
        })
        .then(() => {
          handleClose();
        })
        .catch((err) => err)
        .finally(() => {
          setIsSubmitting(false);
        });
    } else if (uploadType === UPLOAD_TYPE.URL) {
      if (!url)
        return enqueueSnackbar(t("NOTI.CHOOSE_URL"), { variant: "error" });
      formData.append("url", url);
      return AssetAPI.uploadByUrl(formData)
        .then(() => {
          mutate((key) => typeof key === "string" && key.startsWith("/assets"));
        })
        .then(() => {
          handleClose();
        })
        .catch((err) => err)
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    $on("dialog/upload-asset/open", () => {
      handleOpen();
    });

    $on("dialog/upload-asset/close", () => {
      handleClose();
    });

    return () => {
      $remove("dialog/upload-asset/open");
      $remove("dialog/upload-asset/close");
    };
  }, [$on, $remove]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DialogAnimate open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("DIALOG.TITLE.UPLOAD_ASSET")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {isLoading && <Skeleton />}
          {!isLoading && systemOptions && (
            <Autocomplete
              options={systemOptions}
              getOptionLabel={(option) => option.name}
              value={selectedSystem || null}
              onChange={(_, newValue) => {
                setSelectedSystem(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose system"
                  label={t("LABEL.SYSTEM")}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "disabled", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          )}
          <Stack direction="row" justifyContent="center">
            <FormControl>
              <RadioGroup
                row
                value={uploadType}
                onChange={handleChangeUploadType}
              >
                <FormControlLabel
                  value={UPLOAD_TYPE.COMPUTER}
                  control={<Radio />}
                  label={t("RADIO.FROM_COMPUTER")}
                />
                <FormControlLabel
                  value={UPLOAD_TYPE.URL}
                  control={<Radio />}
                  label={t("RADIO.BY_URL")}
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          {uploadType === UPLOAD_TYPE.COMPUTER && (
            <UploadSingleFile file={preview} onDrop={handleDrop} />
          )}

          {uploadType === UPLOAD_TYPE.URL && (
            <Stack spacing={2}>
              <TextField label={t('LABEL.URL')} value={url} onChange={handleChangeURL} />
              {url && (
                <motion.img
                  loading="lazy"
                  alt="url"
                  src={_.isString(url) && url}
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              )}{" "}
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('BUTTON.CANCEL')}
        </Button>
        <LoadingButton
          loading={isSubmitting}
          onClick={handleUpload}
          variant="contained"
        >
          {t('BUTTON.UPLOAD')}
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
};

export default UploadAssetDialog;
