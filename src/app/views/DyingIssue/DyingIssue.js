import React from "react";

import { useSelector } from "react-redux";

import { Formik } from "formik";
import { FastField } from "formik";
import { FieldArray } from "formik";
import { Field } from "formik";
import { Form } from "formik";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

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

  return (
    <Wrapper>
      <Heading heading="Dying Issue" />
      <Formik
        initialValues={constants.INITIAL_VALUES}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Grid container direction="column" rowGap={6}>
              <Meta container rowGap={2} justifyContent="space-between">
                <Grid item xs={5}>
                  <Field
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
                  <Field
                    name={constants.FIELDS.warehouse}
                    component={FormAutoCompleteField}
                    options={essentials.warehouses}
                    label="Warehouse"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    name={constants.FIELDS.manual_book_number}
                    component={FormTextField}
                    fullWidth
                    label="Manual book number"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    name={constants.FIELDS.date}
                    component={FormDateField}
                    label="Date"
                    size="small"
                  />
                </Grid>
              </Meta>
              <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                  <Field
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
                <Grid item xs={5}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
                      <Field
                        name={constants.FIELDS.formula_numerator}
                        component={FormTextField}
                        fullWidth
                        label="Formula 1"
                        size="small"
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Field
                        name={constants.FIELDS.formula_denominator}
                        component={FormTextField}
                        fullWidth
                        label="Formula 2"
                        size="small"
                        type="number"
                      />
                    </Grid>
                  </Grid>
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
                          <Grid container gap={1}>
                            {constants.TEXT_FIELDS.map((field, index) => (
                              <Grid item xs={2}>
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
                                />
                              </Grid>
                            ))}
                            <Grid item xs={2}>
                              <Field
                                component={FormTextField}
                                name={`detail.${rowIndex}.calculated_yards_per_piece`}
                                label="Total (actual)"
                                size="small"
                                disabled
                                value={
                                  (values.formula_numerator /
                                    values.formula_denominator) *
                                    values.detail?.[rowIndex]
                                      .yards_per_piece_actual *
                                    values.detail?.[rowIndex].quantity || 0
                                }
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Field
                                component={FormTextField}
                                name={`detail.${rowIndex}.calculated_expected`}
                                label="Total (expected)"
                                size="small"
                                disabled
                                value={
                                  values.detail?.[rowIndex]
                                    .yards_per_piece_expected *
                                    values.detail?.[rowIndex].quantity || 0
                                }
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <AddRemove
                                disabled={values.detail.length === 1}
                                onAdd={() =>
                                  arrayHelpers.push(
                                    constants.INITIAL_VALUES.detail[0]
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
                {constants.TOTALS.map((field, index) => (
                  <Grid item key={index} xs={4}>
                    <Typography>
                      {values.detail.reduce(
                        (prev, curr) => prev + curr[field],
                        0
                      )}
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
