function verifyObjectValues(object: object) {
  const verify = Object.values(object).map((value) =>
    !value ? false : true
  ) as Array<boolean>;

  return verify.includes(false) ? false : true;
}

export default verifyObjectValues;
