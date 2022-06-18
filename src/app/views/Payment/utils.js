export const formatPaymentDataForPosting = (values, images) => {
  // let formData = new FormData();
  // values.images.forEach((img) => {
  //   formData.append(`images`, img);
  // });
  // formData.append('amount', values.amount);
  // formData.append('date', values.date);
  // formData.append('person', values.person.value);
  // if (values.account_type?.value) {
  //   formData.append('account_type', values.account_type?.value || null);
  // }
  // formData.append('nature', values.nature.value);
  // return formData;
  return {
    ...values,
    person: values.person.value,
    account_type: values.account_type?.value || null,
    nature: values.nature.value,
    images: images,
  };
};
