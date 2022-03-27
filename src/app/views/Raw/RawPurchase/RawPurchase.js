import React from "react";
import { useMemo } from "react";

import { useSelector } from "react-redux";

import { Formik } from "formik";
import { Form } from "formik";
import { FastField } from "formik";
import { FieldArray } from "formik";

import { Grid } from "@mui/material";
import { TextField } from "@mui/material";

import AddRemove from "../../../components/AddRemove";
import ViewWrapper from "../../../components/ViewWrapper";

import { FormAutoCompleteField } from "../../../utilities/formUtils";
import { FormDateField } from "../../../utilities/formUtils";
import { FormTextField } from "../../../utilities/formUtils";
import { FormSwitchField } from "../../../utilities/formUtils";

import * as constants from "./constants";
import * as utils from "./utils";
import { schema } from "./validation";

import { DetailWrapper } from "./styled";
import { LotTotalWrapper } from "./styled";
import { LotHeader } from "./styled";
import { LotWrapper } from "./styled";
import { MetaWrapper } from "./styled";
import { TotalText } from "./styled";

const Total = ({ text, index, variant }) => {
  return (
    <TotalText variant={variant || "caption"} key={index}>
      {text.label} : {text.value}
    </TotalText>
  );
};

const RawPurchase = () => {
  const essentials = useSelector((state) => state.essentials);

  const metaFields = useMemo(
    () => utils.getMetaFields(essentials),
    [essentials]
  );

  const FIELD_MAP = {
    [constants.FIELD_TYPES.NUMBER]: FormTextField,
    [constants.FIELD_TYPES.STRING]: FormTextField,
    [constants.FIELD_TYPES.SELECT]: FormAutoCompleteField,
    [constants.FIELD_TYPES.DATE]: FormDateField,
    [constants.FIELD_TYPES.SWITCH]: FormSwitchField,
  };

  const getFieldProps = (field, errors, touched) => ({
    component: FIELD_MAP[field.type],
    options: field.options,
    name: field.field,
    type: field.type,
    size: "small",
    label: field.label,
    fullWidth: true,
    isError: !!errors[field.field] && touched[field.field],
    errorText: errors[field.field],
    onCheckedLabel: field.onCheckedLabel,
  });

  const calculateValues = (obj) => {
    let qty = obj[constants.FIELDS.quantity] || 0;
    let formula = obj[constants.FIELDS.formula];
    let ratio = formula?.numerator / formula?.denominator;
    let expected = qty * obj[constants.FIELDS.yards_per_piece_expected] || 0;
    let actual =
      qty * ratio * obj[constants.FIELDS.yards_per_piece_actual] || 0;
    let total = obj[constants.FIELDS.rate] * actual;
    return {
      qty,
      expected,
      actual,
      total,
    };
  };

  const getCalculatedValues = (values, lotIndex, lotDetailIndex) => {
    let obj = values.lots[lotIndex].lot_detail[lotDetailIndex];
    let calculated = calculateValues(obj);
    return [
      {
        label: "Actual",
        value: calculated.actual,
      },
      {
        label: "Expected",
        value: calculated.expected,
      },
      {
        label: "Total",
        value: calculated.total,
      },
    ];
  };

  const getTotals = (values, global = false) => {
    let thaan = 0;
    let expected = 0;
    let actual = 0;
    if (global) {
      values.lots.forEach((lot) => {
        lot.lot_detail.forEach((lotDetail) => {
          let calculated = calculateValues(lotDetail);
          expected += calculated.expected;
          actual += calculated.actual;
          thaan += calculated.qty;
        });
      });
    } else {
      values.forEach((lotDetail) => {
        let calculated = calculateValues(lotDetail);
        expected += calculated.expected;
        actual += calculated.actual;
        thaan += calculated.qty;
      });
    }

    return [
      {
        label: "Thaan",
        value: thaan,
      },
      {
        label: "Actual",
        value: actual,
      },
      {
        label: "Expected",
        value: expected,
      },
    ];
  };

  return (
    <ViewWrapper marginBottom={4} heading="Kora Purchase" width={80}>
      <Formik
        initialValues={constants.INITIAL_VALUES}
        validationSchema={schema}
      >
        {({ values, errors, touched }) => (
          <Form>
            <MetaWrapper gap={2} container justifyContent="space-between">
              {metaFields.map((field, index) => (
                <Grid key={index} item xs={5}>
                  <FastField {...getFieldProps(field, errors, touched)} />
                </Grid>
              ))}
            </MetaWrapper>
            <FieldArray
              name={constants.FIELDS.lots}
              render={(arrayHelpersLot) =>
                values.lots &&
                values.lots.map((lot, lotIndex) => (
                  <LotWrapper
                    container
                    direction="column"
                    gap={3}
                    key={lotIndex}
                  >
                    <LotHeader container justifyContent="space-between">
                      <Grid item xs={10}>
                        <Grid container justifyContext="space-between">
                          {utils
                            .getLotHeadField(
                              essentials,
                              lotIndex,
                              values.lots[lotIndex].issue_dying
                            )
                            .map(
                              (field, lotFieldIndex) =>
                                field.render && (
                                  <Grid item xs={3}>
                                    <FastField
                                      {...getFieldProps(field, errors, touched)}
                                      isError={
                                        !!errors.lots?.[lotIndex]?.[
                                          field.name
                                        ] &&
                                        touched.lots?.[lotIndex]?.[field.name]
                                      }
                                      errorText={
                                        errors.lots?.[lotIndex]?.[field.name]
                                      }
                                    />
                                  </Grid>
                                )
                            )}
                        </Grid>
                      </Grid>

                      <Grid item xs={1}>
                        <AddRemove
                          disabled={values.lots.length === 1}
                          onAdd={() =>
                            arrayHelpersLot.push(
                              constants.INITIAL_VALUES.lots[0]
                            )
                          }
                          onDelete={() => arrayHelpersLot.remove(lotIndex)}
                          addColor="secondary"
                        />
                      </Grid>
                    </LotHeader>
                    <DetailWrapper container direction="column" gap={1}>
                      <FieldArray
                        name={`${constants.FIELDS.lots}.${lotIndex}.${constants.FIELDS.lot_detail}`}
                        render={(arrayHelpersLotDetail) =>
                          values.lots[lotIndex]?.lot_detail &&
                          values.lots[lotIndex].lot_detail.map(
                            (lotDetail, index) => (
                              <Grid
                                container
                                columnGap={1}
                                justifyContent="space-between"
                              >
                                {utils
                                  .getLotDetailFields(
                                    essentials,
                                    lotIndex,
                                    index
                                  )
                                  .map((lotDetailField, lotDetailIndex) => {
                                    return !values.lots[lotIndex]
                                      ?.issue_dying ||
                                      lotDetailField.name !== "warehouse" ? (
                                      <Grid
                                        key={lotDetailIndex}
                                        item
                                        xs={lotDetailField.xs || 1}
                                      >
                                        <FastField
                                          {...getFieldProps(
                                            lotDetailField,
                                            errors,
                                            touched
                                          )}
                                          isError={
                                            !!errors.lots?.[lotIndex]
                                              ?.lot_detail?.[index]?.[
                                              lotDetailField.name
                                            ] &&
                                            touched.lots?.[lotIndex]
                                              ?.lot_detail?.[index]?.[
                                              lotDetailField.name
                                            ]
                                          }
                                          errorText={
                                            errors.lots?.[lotIndex]
                                              ?.lot_detail?.[index]?.[
                                              lotDetailField.name
                                            ]
                                          }
                                          variant="standard"
                                        />
                                      </Grid>
                                    ) : null;
                                  })}
                                {getCalculatedValues(
                                  values,
                                  lotIndex,
                                  index
                                ).map((calculated, calIndex) => (
                                  <Grid item xs={1}>
                                    <TextField
                                      disabled
                                      key={calIndex}
                                      label={calculated.label}
                                      size="small"
                                      variant="standard"
                                      value={calculated.value}
                                    />
                                  </Grid>
                                ))}
                                <Grid item xs={1}>
                                  <AddRemove
                                    disabled={
                                      values.lots[lotIndex].lot_detail
                                        .length === 1
                                    }
                                    onAdd={() =>
                                      arrayHelpersLotDetail.push({
                                        ...constants.LOT_DETAIL_INITIAL,
                                        formula:
                                          values.lots[lotIndex].lot_detail[
                                            index
                                          ].formula,
                                      })
                                    }
                                    onDelete={() =>
                                      arrayHelpersLotDetail.remove(index)
                                    }
                                  />
                                </Grid>
                              </Grid>
                            )
                          )
                        }
                      />
                      <LotTotalWrapper container>
                        {getTotals(values.lots[lotIndex].lot_detail).map(
                          (text, textIndex) => (
                            <Total text={text} index={textIndex} />
                          )
                        )}
                      </LotTotalWrapper>
                    </DetailWrapper>
                  </LotWrapper>
                ))
              }
            />
            <Grid container>
              {getTotals(values, true).map((text, textIndex) => (
                <Total text={text} index={textIndex} variant="body2" />
              ))}
            </Grid>
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default RawPurchase;
