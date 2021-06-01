import React, { useMemo } from "react";
import { TextInputForm } from "../../../components";
import { Text, View } from "react-native";
const RecursiveContainer = ({
  config,
  formik,
}: {
  config: any;
  formik: any;
}) => {
  const Builder = ({
    individualConfig,
    index,
  }: {
    individualConfig: any;
    index: number;
  }) => {
    switch (individualConfig.type) {
      case "text":
        return (
          <>
            <TextInputForm
              key={index.toString()}
              label={individualConfig.label}
              style={{ ...individualConfig.style }}
              onChangeText={formik.handleChange}
            />
            {/* <div>
              <label htmlFor={individualConfig.field}>
                {individualConfig.label}
              </label>
              <input
                type="text"
                name={individualConfig.field}
                onChange={formik.handleChange}
                style={{ ...individualConfig.style }}
              />
            </div> */}
          </>
        );
      case "number":
        return (
          <>
            <TextInputForm
              key={index.toString()}
              label={individualConfig.label}
              style={{ ...individualConfig.style }}
              onChangeText={formik.handleChange}
              placeholder={individualConfig.field}
            />
            {/* <div>
              <label htmlFor={individualConfig.field}>
                {individualConfig.label}
              </label>
              <input
                type="number"
                name={individualConfig.field}
                onChange={formik.handleChange}
                style={{ ...individualConfig.style }}
              />
            </div> */}
          </>
        );
      case "array":
        return (
          <RecursiveContainer
            key={index.toString()}
            config={individualConfig.children || []}
            formik={formik}
          />
        );
      default:
        return <Text>Unsupported field</Text>;
    }
  };

  return (
    <>
      {config.map((c: any, index: number) => (
        <View key={index.toString()}>
          <Builder individualConfig={c} index={index} />
        </View>
      ))}
    </>
  );
};

export default RecursiveContainer;
