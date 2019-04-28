// import ajax from  '../utils/api.request'
import request from '../utils/api.request'


//获取套餐
export const qryPackageInfoList = (req) => {
  return request({
    url: '/notoken/package/qry/v1',
    method: 'post',
    data: {
      APSTAR_BODY: req
    }
  })
}

//校验上网登录账号密码

export const checkAccountPassword = (req)=>{
  return request({
    url:'/notoken/acctpassword/check/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}


//个人流量包订购提交订单服务

export const addPersonalPackage =(req)=>{
  return request({
    url:'/notoken/add/package/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}


//根据身份证号获取用户信息

export const custDetailQry =(req)=>{
  return request({
    url:'/notoken/custinfo/qry/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}


//上网账号注册

export const addPerAccount =(req)=>{
  return request({
    url:'/notoken/add/accout/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}
//根据上网账号查询用户信息
export const qryUserInfoByAcct =(req)=>{
  return request({
    url:'/notoken/user/by/acct/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}
//余额查询
export const getPaymentDetail =(req)=>{
  return request({
    url:'/notoken/payment/detail/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}

//微信支付

export const saveEleUnPayment =(req)=>{
  return request({
    url:'/notoken/payment/save/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}

//月套餐费查询
export const selectMonthlyRentalTariffValueByPricingPlanId =(req)=>{
  return request({
    url:'/notoken/bill/query/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}

//用户信息详情查询
export const userInfoDetail =(req)=>{
  return request({
    url:'notoken/user/detail/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}

//查询缴费信息
export const getPaymentRecordById =(req)=>{
  return request({
    url:'notoken/payment/record/detail/v1',
    method:'post',
    data:{
      APSTAR_BODY: req
    }
  })
}
