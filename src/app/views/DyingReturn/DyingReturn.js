import React from "react";

import { useSelector } from "react-redux";

import { Formik } from "formik";
import { Field } from "formik";
import { FieldArray } from "formik";
import { Form } from "formik";

import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";

import DyingReturnMeta from "../../components/DyingReturnMeta";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";

import Heading from "../../components/Heading";

import { FormAutoCompleteField } from "../../utilities/formUtils";
import { FormDateField } from "../../utilities/formUtils";
import { FormTextField } from "../../utilities/formUtils";

import { Wrapper } from "./styled";

import { INITIAL_VALUES } from "./constants";

const DyingReturn = () => {
  const essentials = useSelector((state) => state.essentials);
  const lotData = {
    dying_unit: "Manzoor Ayub",
    lot_number: 456,
    lot_issue_date: "2022-02-10",
    manual_book_number: "560",
    warehouse: "Warehouse 1",
    expected_yards: 356.5,
    quantity: 10,
  };
  return (
    <Wrapper>
      <Heading heading="Dying Return" />
      <DyingReturnMeta lotData={lotData} />
      <Formik initialValues={INITIAL_VALUES}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid sx={{ my: 4 }} container justifyContent="space-between">
              <Grid item xs={5}>
                <Field
                  size="small"
                  component={FormDateField}
                  label="Date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <Field
                  component={FormAutoCompleteField}
                  label="Warehouse"
                  options={essentials.warehouses}
                  name={"warehouse"}
                />
              </Grid>
            </Grid>

            <FieldArray
              name="detail"
              render={(arrayHelpers) =>
                values.detail &&
                values.detail.length > 0 && (
                  <Grid container direction="column" rowGap={2}>
                    {values.detail.map((row, index) => (
                      <Grid container key={index}>
                        <Grid item xs={2}>
                          <Field
                            component={FormAutoCompleteField}
                            options={essentials.products}
                            name={`detail.${index}.product`}
                            label="Product"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Field
                            component={FormTextField}
                            type="number"
                            size="small"
                            name={`detail.${index}.quantity`}
                            label="Thaan"
                            onChange={(e) => {
                              setFieldValue(
                                `detail.${index}.quantity`,
                                e.target.value
                              );
                              setFieldValue(
                                `detail.${index}.total_yards`,
                                e.target.value *
                                  values.detail[index].rate_yards || 0
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Field
                            component={FormTextField}
                            type="number"
                            size="small"
                            name={`detail.${index}.actual_yards`}
                            label="Actual"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Field
                            component={FormTextField}
                            type="number"
                            size="small"
                            name={`detail.${index}.rate_yards`}
                            label="Expected"
                            onChange={(e) => {
                              setFieldValue(
                                `detail.${index}.rate_yards`,
                                e.target.value
                              );
                              setFieldValue(
                                `detail.${index}.total_yards`,
                                e.target.value *
                                  values.detail[index].quantity || 0
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Field
                            component={FormTextField}
                            type="number"
                            size="small"
                            name={`detail.${index}.total_yards`}
                            label="Gazaana"
                            disabled
                            value={
                              values.detail[index].quantity *
                                values.detail[index].rate_yards || 0
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Field
                            component={FormAutoCompleteField}
                            options={[
                              {
                                value: "yards",
                                label: "yards",
                              },
                              {
                                value: "thaan",
                                label: "thaan",
                              },
                            ]}
                            name={`detail.${index}.unit`}
                            label="Unit"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Field
                            component={FormTextField}
                            type="number"
                            size="small"
                            name={`detail.${index}.rate`}
                            label="Rate"
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Field
                            component={FormTextField}
                            type="number"
                            size="small"
                            name={`detail.${index}.total`}
                            label="Total"
                            disabled
                            value={
                              values.detail[index].rate *
                                (values.detail[index]?.unit?.value === "yards"
                                  ? values.detail[index].total_yards
                                  : values.detail[index]?.unit?.value ===
                                    "thaan"
                                  ? values.detail[index].quantity
                                  : 0) || 0
                            }
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container>
                            <IconButton
                              disabled={values.detail.length === 1}
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                arrayHelpers.push(INITIAL_VALUES.detail[0])
                              }
                            >
                              <AddCircleRoundedIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                )
              }
            />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

DyingReturn.defaultProps = {
  lotData: {
    dying_unit: "Manzoor Ayub",
    lot_number: 456,
    lot_issue_date: "2022-02-10",
    manual_book_number: "560",
    warehouse: "Warehouse 1",
    expected_yards: 356.5,
    quantity: 10,
  },
};

export default DyingReturn;
