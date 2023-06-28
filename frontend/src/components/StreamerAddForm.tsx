import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";

interface StreamerFormValues {
  name: string;
  platform: string;
  description: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  platform: Yup.string().required("Platform is required"),
  description: Yup.string().required("Description is required"),
});

const MAX_NAME_LENGTH = 15;
const MAX_DESCRIPTION_LENGTH = 200;

export default function StreamerSubmissionForm(props) {
  const [initialValues, setInitialValues] = useState<StreamerFormValues>({
    name: "",
    platform: "",
    description: "",
  });
  const [resMsg, setresMsg] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values: StreamerFormValues) => {
    try {
      const url = "http://localhost:5000/streamers";
      const streamerData = {
        name: values.name,
        platform: values.platform,
        description: values.description,
      };
      const { data: res } = await axios.post(url, streamerData);
      const updatedAllStramers  = [...props.allStreamers, res.streamer];
      props.setAllStreamers(updatedAllStramers);
      setresMsg(res.message);
      setIsSubmitted(true);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  const handleFormSubmit = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      setInitialValues({
        name: "",
        platform: "",
        description: "",
      });
      setIsSubmitted(false);
    }
  }, [isSubmitted]);
  

  return (
    <div className="FormContainer">
      <h1>ADD STREAMER</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
        <Form>
          <div className="form-line">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" maxLength={MAX_NAME_LENGTH} />
            {isSubmitted && (
              <div className="error_msg">
                <ErrorMessage name="name" component="div" />
              </div>
            )}
          </div>
          <div className="form-line">
            <label htmlFor="platform">Streaming Platform</label>
            <Field as="select" id="platform" name="platform">
              <option value="">Select Platform</option>
              <option value="Twitch">Twitch</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Kick">Kick</option>
              <option value="Rumble">Rumble</option>
            </Field>
            {isSubmitted && (
              <div className="error_msg">
                <ErrorMessage name="platform" component="div" />
              </div>
            )}
          </div>
          <div className="form-line">
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            {isSubmitted && (
              <div className="error_msg">
                <ErrorMessage name="description" component="div" />
              </div>
            )}
          </div>
          {error ? (
            <div className="error_msg">{error}</div>
          ) : (
            resMsg !== "" && <div className="success_msg">{resMsg}</div>
          )}
          <button type="submit" onClick={handleFormSubmit}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
