import React from 'react';

// import check from './CheckPermissions';
const Result = () => <div>你没有权限</div>;

function checkValid(list = [], target = []) {
  let flag = false;
  if (list.length === 0) {
    return true;
  }
  list.forEach((v) => {
    if (target.includes(v)) {
      flag = true;
    }
  });
  return flag;
}

function check(authority, currentAuthority, target, Exception) {
  const CURRENT = currentAuthority;
  console.log('check', authority, CURRENT, checkValid(authority, CURRENT));
  const isValid = checkValid(authority, CURRENT);
  if (isValid) {
    return target;
  }
  return Exception;
  // return checkPermissions(authority, CURRENT, target, Exception);
}

const Authorized = ({
  children,
  authority,
  currentAuthority,
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
  ),
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, currentAuthority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
