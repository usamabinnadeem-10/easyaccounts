import React from "react";

import { useSelector } from "react-redux";

import { Formik } from "formik";
import { FastField } from "formik";
import { FieldArray } from "formik";
import { Form } from "formik";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";

import AddRemove from "../../components/AddRemove";
import Heading from "../../components/Heading";

import { FormAutoCompleteField } from "../../utilities/formUtils";
import { FormDateField } from "../../utilities/formUtils";
import { FormTextField } from "../../utilities/formUtils";

import * as constants from "./constants";
import { validationSchema } from "./validation";
import { Meta } from "./styled";
import { Wrapper } from "./styled";

const DyingIssue = () => {
  const essentials = useSelector((state) => state.essentials);

  const getTotals = (values) => {
    let detail = values.detail;
    let thaan = detail.reduce((prev, curr) => prev + curr.quantity, 0);
    let actual = detail.reduce((prev, curr) => {
      let ratio = (curr.formula_numerator / curr.formula_denominator) || 0;
      return prev + ((ratio * curr.yards_per_piece_actual * curr.quantity) || 0)
    }, 0)
    let expected = detail.reduce((prev, curr) => prev + curr.quantity * curr.yards_per_piece_expected, 0);
    return [
      {
        label: 'Total thaan',
        value: thaan,
      },
      {
        label: 'Total Actual',
        value: actual,
      },
      {
        label: 'Total Expected',
        value: expected,
      },
    ]
  }

  return (
    <Wrapper>
      <Heading heading="Dying Issue" />
      <Formik
        initialValues={constants.INITIAL_VALUES}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Grid container direction="column" rowGap={6}>
              <Meta container rowGap={2} justifyContent="space-between">
                <Grid item xs={5}>
                  <FastField
                    name={constants.FIELDS.dying_unit}
                    component={FormAutoCompleteField}
                    options={[
                      {
                        label: "Manzoor Ayub",
                        value: "21421412",
                      },
                      {
                        label: "Dying Unit 2",
                        value: "21421412aasd",
                      },
                    ]}
                    label="Dying Unit"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FastField
                    name={constants.FIELDS.warehouse}
                    component={FormAutoCompleteField}
                    options={essentials.warehouses}
                    label="Warehouse"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FastField
                    name={constants.FIELDS.manual_book_number}
                    component={FormTextField}
                    fullWidth
                    label="Manual book number"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FastField
                    name={constants.FIELDS.date}
                    component={FormDateField}
                    label="Date"
                    size="small"
                  />
                </Grid>
              </Meta>
              <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                  <FastField
                    name={constants.FIELDS.raw_product}
                    component={FormAutoCompleteField}
                    options={[
                      {
                        label: "30/56",
                        value: "21421412",
                      },
                      {
                        label: "100/75",
                        value: "asd",
                      },
                    ]}
                    label="Raw product"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <FieldArray
                  name={constants.FIELDS.detail}
                  render={(arrayHelpers) =>
                    values.detail &&
                    values.detail.length > 0 && (
                      <Grid container direction="column" rowGap={2}>
                        {values.detail.map((row, rowIndex) => (
                          <Grid container gap={1} justifyContent="space-between">
                            {constants.TEXT_FIELDS.map((field, index) => (
                              <Grid item xs={1}>
                                <FastField
                                  component={FormTextField}
                                  name={`detail.${rowIndex}.${field.name}`}
                                  label={field.label}
                                  isError={
                                    !!errors.detail?.[rowIndex]?.[field.name] &&
                                    touched.detail?.[rowIndex]?.[field.name]
                                  }
                                  errorText={
                                    errors.detail?.[rowIndex]?.[field.name]
                                  }
                                  size="small"
                                  type="number"
                                  variant='standard'
                                />
                              </Grid>
                            ))}
                            <Grid item xs={2}>
                              <TextField
                                label="Total (actual)"
                                size="small"
                                disabled
                                value={
                                  (values.detail?.[rowIndex].formula_numerator /
                                    values.detail?.[rowIndex].formula_denominator) *
                                    values.detail?.[rowIndex]
                                      .yards_per_piece_actual *
                                    values.detail?.[rowIndex].quantity || 0
                                }
                                variant='standard'
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                label="Total (expected)"
                                size="small"
                                disabled
                                value={
                                  values.detail?.[rowIndex]
                                    .yards_per_piece_expected *
                                    values.detail?.[rowIndex].quantity || 0
                                }
                                variant='standard'
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <AddRemove
                                disabled={values.detail.length === 1}
                                onAdd={() =>
                                  arrayHelpers.push(
                                    {
                                      ...constants.INITIAL_VALUES.detail[0],
                                      formula_numerator: values.detail[rowIndex].formula_numerator,
                                      formula_denominator: values.detail[rowIndex].formula_denominator,
                                    }
                                    
                                  )
                                }
                                onDelete={() => arrayHelpers.remove(rowIndex)}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    )
                  }
                />
              </Grid>
              <Grid container>
                {getTotals(values).map((value, index) => (
                  <Grid item key={index} xs={index === 0 ? 6 : 3}>
                    <Typography variant='caption'>
                      {value.label} : {value.value}
                    </Typography>
                </Grid>
                ))}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default DyingIssue;
