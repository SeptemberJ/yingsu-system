<template>
  <div class="General">
    <div class="searchBar">
      <el-form :inline="true" :model="formSearch" size="small" class="demo-form-inline">
        <el-form-item label="发布日期：">
          <el-date-picker
            v-model="formSearch.releaseDate"
            style="width: 240px;"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="发货人：">
          <el-input v-model="formSearch.fpeople" clearable placeholder="" style="width: 130px;" />
        </el-form-item>
        <el-form-item label="提货人：">
          <el-input v-model="formSearch.tpeople" clearable placeholder="" style="width: 130px;" />
        </el-form-item>
        <el-form-item label="收货人：">
          <el-input v-model="formSearch.speople" clearable placeholder="" style="width: 130px;" />
        </el-form-item>
        <el-form-item label="订单号：">
          <el-input v-model="formSearch.orderNo" clearable placeholder="" style="width: 169px;" />
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select v-model="formSearch.status" placeholder="请选择" style="width: 118px;">
            <el-option
              v-for="item in option_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发货地：">
          <el-select v-model="formSearch.fprovinceId" placeholder="请选择" @change="((value) => { changeProvince(value, 'f', 0) })">
            <el-option
              v-for="item in option_province"
              :key="item.id"
              :label="item.fname"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="formSearch.fcityId" placeholder="请选择" style="width: 118px;" @change="((value) => { changeCity(value, 'f', 0) })">
            <el-option
              v-for="item in option_fcity"
              :key="item.sareacode"
              :label="item.sareaname"
              :value="item.sareacode"
            />
          </el-select>
          <el-select v-model="formSearch.fareaId" placeholder="请选择" style="width: 118px;" @change="((value) => { changeArea(value, 'f') })">
            <el-option
              v-for="item in option_farea"
              :key="item.fareacode"
              :label="item.fareaname"
              :value="item.fareacode"
            />
          </el-select>
          <el-input v-model="formSearch.faddr" clearable placeholder="请填写发货详细地址门牌号" style="width: 190px;" />
        </el-form-item>
        <el-form-item label="收货地：">
          <el-select v-model="formSearch.sprovinceId" placeholder="请选择" style="width: 118px;" @change="((value) => { changeProvince(value, 's', 0) })">
            <el-option
              v-for="item in option_province"
              :key="item.id"
              :label="item.fname"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="formSearch.scityId" placeholder="请选择" style="width: 118px;" @change="((value) => { changeCity(value, 's', 0) })">
            <el-option
              v-for="item in option_scity"
              :key="item.sareacode"
              :label="item.sareaname"
              :value="item.sareacode"
            />
          </el-select>
          <el-select v-model="formSearch.sareaId" placeholder="请选择" style="width: 118px;" @change="((value) => { changeArea(value, 's') })">
            <el-option
              v-for="item in option_sarea"
              :key="item.fareacode"
              :label="item.fareaname"
              :value="item.fareacode"
            />
          </el-select>
          <el-input v-model="formSearch.saddr" clearable placeholder="请填写收货详细地址门牌号" style="width: 190px;" />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" style="width: 100px;">查询</el-button>
      </el-form>
    </div>
    <div class="OptionsBar">
      <router-link to="/order/generalAdd/">
        <el-button type="primary" size="small">新建普货发货</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>

// import { getUserBasicInfo } from '@/utils/auth'
import { getProvince, getCity, getArea } from '@/api/order'
export default {
  name: 'General',
  components: {
  },
  data() {
    return {
      option_status: [
        { label: '全部', value: '全部' },
        { label: '已有报价', value: '已有报价' },
        { label: '待对方签约', value: '待对方签约' },
        { label: '已成交', value: '已成交' },
        { label: '已取消', value: '已取消' }
      ],
      option_province: [],
      option_fcity: [],
      option_farea: [],
      option_scity: [],
      option_sarea: [],
      formSearch: {
        releaseDate: '',
        fpeople: '',
        tpeople: '',
        speople: '',
        orderNo: '',
        status: '',
        fprovince: '',
        fprovinceId: '',
        fcity: '',
        fcityId: '',
        farea: '',
        fareaId: '',
        faddr: '',
        sprovince: '',
        sprovinceId: '',
        scity: '',
        scityId: '',
        sarea: '',
        sareaId: '',
        saddr: ''
      },
      formOrder: {
        zhDate: '',
        zhStage: '',
        zhTime: '',
        xhDate: '',
        xhStage: '',
        xhTime: ''
      },
      startDateDisabled: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    const start = new Date()
    this.formSearch.releaseDate = [start, new Date(start.getTime() + 3600 * 1000 * 24 * 6)]
    this.initOptionsProvince()
  },
  methods: {
    initOptionsProvince(val) {
      getProvince().then(res => {
        this.option_province = res.data
      })
    },
    changeProvince(val, type, ifclear) {
      let fname = ''
      this.option_province.find(Province => {
        if (Province.id === val) {
          fname = Province.fname
          this.formSearch[type + 'province'] = Province.fname
          getCity({ pid: val, fname: fname }).then(res => {
            this['option_' + type + 'city'] = res.data
          })
          if (ifclear === 0) {
            this.formSearch[type + 'city'] = ''
            this.formSearch[type + 'cityId'] = ''
            this.formSearch[type + 'area'] = ''
            this.formSearch[type + 'areaId'] = ''
            this['option_' + type + 'area'] = []
          }
        }
      })
    },
    changeCity(val, type, ifclear) {
      let fname = ''
      this['option_' + type + 'city'].find(City => {
        if (City.sareacode === val) {
          fname = City.sareaname
          this.formSearch[type + 'city'] = City.sareaname
          getArea({ pid: val, fname: fname }).then(res => {
            this['option_' + type + 'area'] = res.data
          })
          if (ifclear === 0) {
            this.formSearch[type + 'area'] = ''
            this.formSearch[type + 'areaId'] = ''
            this['option_' + type + 'area'] = []
          }
        }
      })
    },
    changeArea(val, type) {
      this['option_' + type + 'area'].find(Area => {
        if (Area.fareacode === val) {
          this.formSearch[type + 'area'] = Area.fareaname
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.General{
  background: #FFFFFF;
  .searchBar{
   padding: 10px 20px;
  }
  .OptionsBar{
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #D7D7D7;
    border-bottom: 1px solid #D7D7D7;
    padding: 0 20px;
  }
}
</style>
