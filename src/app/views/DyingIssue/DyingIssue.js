import React from "react";

import { useSelector } from "react-redux";

import { Formik } from "formik";
import { Field } from "formik";
import { Form } from "formik";

import { Grid } from "@mui/material";

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
        {({ values, setFieldValue }) => (
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
                <Grid item xs={5}>
                  <Grid rowGap={2} container direction="column">
                    <Grid item xs={12}>
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
                    <Field
                      name={constants.FIELDS.quantity}
                      component={FormTextField}
                      fullWidth
                      label="Thaan quantity"
                      size="small"
                      type="number"
                    />
                    <Field
                      name={constants.FIELDS.rate_yards}
                      component={FormTextField}
                      fullWidth
                      label="Yard rate"
                      size="small"
                      type="number"
                    />
                    <Field
                      name={constants.FIELDS.actual_yards}
                      component={FormTextField}
                      fullWidth
                      label="Actual rate"
                      size="small"
                      type="number"
                    />
                    <Field
                      name={constants.FIELDS.yards_per_piece_actual}
                      component={FormTextField}
                      fullWidth
                      label="Gazaana (actual)"
                      size="small"
                      type="number"
                    />
                    <Field
                      name={constants.FIELDS.yards_per_piece_expected}
                      component={FormTextField}
                      fullWidth
                      label="Gazaana (expected)"
                      size="small"
                      type="number"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid
                    rowGap={2}
                    container
                    direction="column"
                    justifyContent="flex-end"
                    sx={{ height: 1 }}
                  >
                    <Field
                      name={constants.FIELDS.calculated_yards_per_piece}
                      component={FormTextField}
                      fullWidth
                      label="Total yards (actual)"
                      size="small"
                      value={
                        values[constants.FIELDS.quantity] *
                          (values[constants.FIELDS.rate_yards] /
                            values[constants.FIELDS.actual_yards]) *
                          values[constants.FIELDS.yards_per_piece_actual] || 0
                      }
                      type="number"
                      disabled
                    />
                    <Field
                      name={constants.FIELDS.calculated_expected}
                      component={FormTextField}
                      fullWidth
                      label="Total yards (expected)"
                      size="small"
                      type="number"
                      disabled
                      value={
                        values[constants.FIELDS.quantity] *
                          values[constants.FIELDS.yards_per_piece_expected] || 0
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default DyingIssue;
