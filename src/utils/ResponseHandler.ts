export const handleResponse = (
  res: any,
  data: any,
  {
    success = "Data fetched successfully",
    error = "Failed to fetch data, please try again.",
  }
) => {
  try {
    if (data) {
      return res.status(200).send({
        status: true,
        data: data,
        message: success,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: error,
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Internal server error, contact support.",
    });
  }
};
