<template>
  <div class="GeneralAdd">
    <el-form ref="formOrder" :inline="true" :model="formOrder" :rules="rulesOrder" label-position="top" size="small" class="demo-form-inline formAdd">
      <div class="ContentCard">
        <div class="ColumTitBar">
          <span class="ColumTxt">基本信息</span>
          <span>（红色为必填项）</span>
        </div>
        <div class="ContentBlock" style="padding:10px 20px;background: #FFFFFF;">
          <el-col :span="24">
            <el-form-item label="用车类型：" class="RequireLabel" prop="carType">
              <el-radio-group v-model="formOrder.carType" size="small">
                <el-radio-button label="整车" />
                <el-radio-button label="零担" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="客户订单号：">
              <el-input v-model="formOrder.cusOrderNo" placeholder="请填写您自己系统的相关单号" style="width: 250px;" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用车车型：(最多选3项)" class="RequireLabel" prop="vehicleType">
              <el-checkbox-group v-model="formOrder.vehicleType" :max="3" size="small">
                <el-checkbox-button v-for="type in option_vehicleType" :key="type.typename" :label="type.typename" @change="((value) => {changeCarType(value, type)})" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用车车长：(最多选3项)" class="RequireLabel" prop="vehicleLength">
              <el-checkbox-group v-model="formOrder.vehicleLength" :max="3" size="small" style="display:inline-block;">
                <el-checkbox-button v-for="length in option_vehicleLength" :key="length.carLength" :label="length.carLength" @change="((value) => {showTips(value, length)})" />
                <el-input v-model="formOrder.cusCarLength" type="number" size="small" :min="1" placeholder="请填其他车长" style="width:180px;top:2px;padding-right:0;" @blur="customerCarLength" @keyup.enter.native="customerCarLength">
                  <template slot="append">米</template>
                </el-input>
              </el-checkbox-group>
            </el-form-item>
            <!-- <el-form-item label=" ">
              <el-input v-model="formOrder.cusCarLength" type="number" size="small" :min="1" placeholder="请填其他车长" style="width:180px;top:4px;" @blur="customerCarLength" @keyup.enter.native="customerCarLength">
                <template slot="append">米</template>
              </el-input>
            </el-form-item> -->
          </el-col>
        </div>
      </div>
      <div class="ContentCard">
        <div class="ColumTitBar">
          <span class="ColumTxt">装卸信息</span>
          <span>（红色为必填项）</span>
          <span class="CountNo">
            {{ formOrder.zhInfo.length }}装 {{ formOrder.xhInfo.length }}卸
          </span>
        </div>
        <div class="ContentBlock">
          <!-- 装货 -->
          <div v-for="(zhItem,zhIdx) in formOrder.zhInfo" :key="'zh' + zhIdx" class="AddrInfoBlock">
            <div v-show="formOrder.zhInfo.length > 1" class="IndexBlock">{{ zhIdx + 1 }}</div>
            <div class="AddrMian">
              <div class="leftInfoBlock">
                <el-form-item label="装货地址：" class="RequireLabel" style="width:30%;" :prop="'zhInfo.' + zhIdx + '.area'" :rules="rulesOrder.area">
                  <el-select v-model="zhItem.provinceId" placeholder="请选择" @change="((value) => { changeProvince(value, zhIdx, 'zh', 0) })">
                    <el-option
                      v-for="item in option_province"
                      :key="item.id"
                      :label="item.fname"
                      :value="item.id"
                    />
                  </el-select>
                  <el-select v-model="zhItem.cityId" placeholder="请选择" @change="((value) => { changeCity(value, zhIdx, 'zh', 0) })">
                    <el-option
                      v-for="item in zhItem.option_city"
                      :key="item.sareacode"
                      :label="item.sareaname"
                      :value="item.sareacode"
                    />
                  </el-select>
                  <el-select v-model="zhItem.areaId" placeholder="请选择" @change="((value) => { changeArea(value, zhIdx, 'zh') })">
                    <el-option
                      v-for="item in zhItem.option_area"
                      :key="item.fareacode"
                      :label="item.fareaname"
                      :value="item.fareacode"
                    />
                  </el-select>
                  <!-- <el-input v-model="zhItem.addr" size="small" class="addrInput" placeholder="请填写详细地址门牌号" /> -->
                </el-form-item>
                <el-form-item label=" " class="RequireLabel" style="width: 17%;" :prop="'zhInfo.' + zhIdx + '.addr'" :rules="rulesOrder.addr">
                  <el-input v-model="zhItem.addr" size="small" placeholder="请填写详细地址门牌号" />
                </el-form-item>
                <el-form-item label="发货人姓名：" class="RequireLabel" style="width: 12.5%;" :prop="'zhInfo.' + zhIdx + '.fpeople'" :rules="rulesOrder.fpeople">
                  <el-input v-model="zhItem.fpeople" size="small" />
                </el-form-item>
                <el-form-item label="发货人电话：" class="RequireLabel" style="width: 12.5%;" :prop="'zhInfo.' + zhIdx + '.fphone'" :rules="rulesOrder.fphone">
                  <el-input v-model="zhItem.fphone" size="small" />
                </el-form-item>
                <el-form-item label="提货人姓名：" class="RequireLabel" style="width: 12.5%;" :prop="'zhInfo.' + zhIdx + '.tpeople'" :rules="rulesOrder.tpeople">
                  <el-input v-model="zhItem.tpeople" size="small" />
                </el-form-item>
                <el-form-item label="提货人电话：" class="RequireLabel" style="width: 12.5%;" :prop="'zhInfo.' + zhIdx + '.tphone'" :rules="rulesOrder.tphone">
                  <el-input v-model="zhItem.tphone" size="small" />
                </el-form-item>
              </div>
              <div class="rightBtBlock">
                <el-form-item label=" ">
                  <el-button size="small" class="borderBlue" style="width:100px;" @click="twoPeopleSame(zhIdx)">发货/提货人相同</el-button>
                  <el-button type="primary" size="small" style="width:80px;" @click="savePeople(zhIdx, 'zh')">保存发货人</el-button>
                  <el-button type="primary" size="small" style="width:80px;" @click="choosePeople(zhIdx, 'zh', true)">选择发货人</el-button>
                </el-form-item>
              </div>
              <div class="dateBlock">
                <el-form-item label="装货日期：" class="RequireLabel" :prop="'zhInfo.' + zhIdx + '.date'" :rules="rulesOrder.date">
                  <el-date-picker
                    v-model="zhItem.date"
                    :picker-options="startDateDisabled"
                    style="width: 150px;"
                    type="date"
                    placeholder="请选择装货日期"
                    value-format="yyyy-MM-dd"
                    @change="((value) => {changeDate(value, zhIdx, 'zh')})"
                  />
                </el-form-item>
                <el-form-item label="装货时段：" class="RequireLabel" :prop="'zhInfo.' + zhIdx + '.stage'" :rules="rulesOrder.stage">
                  <el-select v-model="zhItem.stage" placeholder="请选择" style="width: 118px;" @change="((value) => {changeStage(value, zhIdx, 'zh')})">
                    <el-option
                      v-for="item in zhItem.stageOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="装货时间：" class="RequireLabel" :prop="'zhInfo.' + zhIdx + '.time'" :rules="rulesOrder.time">
                  <el-select v-model="zhItem.time" placeholder="请选择" style="width: 118px;">
                    <el-option
                      v-for="item in zhItem.timeOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <div class="rightBtBlock">
                  <el-form-item label=" ">
                    <el-button size="small" icon="el-icon-document-copy" class="borderBlue" style="width:100px;" @click="copyInfo(zhIdx, 'zh')">复制装货信息</el-button>
                    <el-button v-if="zhIdx == 0" icon="el-icon-circle-plus" size="small" class="borderBlue" style="width:100px;" @click="addZX('zh')">增加装货信息</el-button>
                    <el-button v-if="zhIdx != 0" icon="el-icon-remove" size="small" class="borderBlue" style="width:100px;" @click="removeZX(zhIdx, 'zh')">删除装货信息</el-button>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <!-- 卸货 -->
          <div v-for="(xhItem, xhIdx) in formOrder.xhInfo" :key="'xh' + xhIdx" class="AddrInfoBlock">
            <div v-show="formOrder.xhInfo.length > 1" class="IndexBlock">{{ xhIdx + 1 }}</div>
            <div class="AddrMian">
              <div class="leftInfoBlock">
                <el-form-item label="卸货地址：" class="RequireLabel" style="width:30%;" :prop="'xhInfo.' + xhIdx + '.area'" :rules="rulesOrder.area">
                  <el-select v-model="xhItem.provinceId" placeholder="请选择" @change="((value) => { changeProvince(value, xhIdx, 'xh', 0) })">
                    <el-option
                      v-for="item in option_province"
                      :key="item.id"
                      :label="item.fname"
                      :value="item.id"
                    />
                  </el-select>
                  <el-select v-model="xhItem.cityId" placeholder="请选择" @change="((value) => { changeCity(value, xhIdx, 'xh', 0) })">
                    <el-option
                      v-for="item in xhItem.option_city"
                      :key="item.sareacode"
                      :label="item.sareaname"
                      :value="item.sareacode"
                    />
                  </el-select>
                  <el-select v-model="xhItem.areaId" placeholder="请选择" @change="((value) => { changeArea(value, xhIdx, 'xh') })">
                    <el-option
                      v-for="item in xhItem.option_area"
                      :key="item.fareacode"
                      :label="item.fareaname"
                      :value="item.fareacode"
                    />
                  </el-select>
                  <!-- <el-input v-model="xhItem.addr" size="small" class="addrInput" placeholder="请填写详细地址门牌号" /> -->
                </el-form-item>
                <el-form-item label=" " class="RequireLabel" style="width: 17%;" :prop="'xhInfo.' + xhIdx + '.addr'" :rules="rulesOrder.addr">
                  <el-input v-model="xhItem.addr" size="small" placeholder="请填写详细地址门牌号" />
                </el-form-item>
                <el-form-item label="收货人姓名：" class="RequireLabel" style="width: 12.5%;" :prop="'xhInfo.' + xhIdx + '.fpeople'" :rules="rulesOrder.fpeople">
                  <el-input v-model="xhItem.fpeople" size="small" />
                </el-form-item>
                <el-form-item label="收货人手机：" class="RequireLabel" style="width: 12.5%;" :prop="'xhInfo.' + xhIdx + '.fphone'" :rules="rulesOrder.fphone">
                  <el-input v-model="xhItem.fphone" size="small" />
                </el-form-item>
                <el-form-item label="收货人固话：" style="width: 25%;">
                  <el-input v-model="xhItem.fixedTel">
                    <template slot="prepend">{{ xhItem.fixedPre }}</template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="rightBtBlock">
                <el-form-item label=" ">
                  <el-button type="primary" size="small" style="width:80px;" @click="savePeople(xhIdx, 'xh')">保存收货人</el-button>
                  <el-button type="primary" size="small" style="width:80px;" @click="choosePeople(xhIdx, 'xh', true)">选择收货人</el-button>
                </el-form-item>
              </div>
              <div class="dateBlock">
                <el-form-item label="卸货日期：" class="RequireLabel">
                  <el-date-picker
                    v-model="xhItem.date"
                    :picker-options="startDateDisabled"
                    style="width: 150px;"
                    type="date"
                    placeholder="请选择卸货日期"
                    value-format="yyyy-MM-dd"
                    @change="((value) => {changeDate(value, xhIdx, 'xh')})"
                  />
                </el-form-item>
                <el-form-item label="卸货时段：" class="RequireLabel">
                  <el-select v-model="xhItem.stage" placeholder="请选择" style="width: 118px;" @change="((value) => {changeStage(value, xhIdx, 'xh')})">
                    <el-option
                      v-for="item in xhItem.stageOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="卸货时间：" class="RequireLabel">
                  <el-select v-model="xhItem.time" placeholder="请选择" style="width: 118px;">
                    <el-option
                      v-for="item in xhItem.timeOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <div class="rightBtBlock">
                  <el-form-item>
                    <el-button size="small" icon="el-icon-document-copy" class="borderBlue" style="width:100px;" @click="copyInfo(xhIdx, 'xh')">复制卸货信息</el-button>
                    <el-button v-if="xhIdx == 0" icon="el-icon-circle-plus" size="small" class="borderBlue" style="width:100px;" @click="addZX('xh')">增加卸货信息</el-button>
                    <el-button v-if="xhIdx != 0" icon="el-icon-remove" size="small" class="borderBlue" style="width:100px;" @click="removeZX(xhIdx, 'xh')">删除卸货信息</el-button>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ContentCard">
        <div class="ColumTitBar">
          <span class="ColumTxt">货物信息</span>
          <span>（红色为必填项）</span>
          <span class="CountGoods">
            {{ totalWeight }}
            <span>吨</span>
          </span>
          <span class="CountGoods">
            {{ totalVolume }}
            <span>方</span>
          </span>
          <el-button type="primary" size="small" style="width: 80px;height:30px;color: #FFFFFF;float: right;margin-top:7px;margin-left: 10px;" @click="addGoods">添加货物</el-button>
          <div class="Bt hoverBtBlue">下载普货导入模板</div>
          <div class="Bt hoverBtBlue">导入普货发货计划</div>
        </div>
        <div class="ContentBlock">
          <div class="GoodsInfo">
            <el-table :data="formOrder.goods" border fit :header-cell-style="{background:'#F2F2F2',color:'#606266', fontWeight: 400}" :header-cell-class-name="headerCellClassName" style="width: 100%;margin: 10px 0;">
              <el-table-column
                prop="kind"
                label="货物分类"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'goods.' + scope.$index + '.code'" :rules="rulesOrder.code">
                    <el-select v-model="scope.row.code" placeholder="-请选择分类-" @change="((value) => {changeGoodsType(value, scope.$index)})">
                      <el-option
                        v-for="item in option_goods"
                        :key="item.id"
                        :label="item.fname"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="货物名称"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'goods.' + scope.$index + '.name'" :rules="rulesOrder.name">
                    <el-input v-model="scope.row.name" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="weight"
                label="重量（吨）"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'goods.' + scope.$index + '.weight'" :rules="rulesOrder.weight">
                    <el-input v-model="scope.row.weight" type="number" :min="0" @keyup.native="provingWV(scope.$index, 'weight')" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="volume"
                label="体积（方）"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'goods.' + scope.$index + '.volume'" :rules="rulesOrder.volume">
                    <el-input v-model="scope.row.volume" type="number" :min="0" @keyup.native="provingWV(scope.$index, 'volume')" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="norms"
                label="包装规格"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.norms" />
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                label="数量"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.number" />
                </template>
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit" />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="85">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="goodsDel(scope.$index, scope.row)">删除货物</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="ContentCard">
        <div class="ColumTitBar">
          <span class="ColumTxt">要求与备注</span>
          <span>（红色为必填项）</span>
        </div>
        <div class="ContentBlock" style="padding:10px 20px;background: #FFFFFF;">
          <div class="otherInfo">
            <el-col :span="24">
              <el-form-item label="期望价格：">
                <el-input v-model="formOrder.expectedPrice" type="number" :min="0" class="suffix" placeholder="请填写期望运费价格" style="width: 250px;" @mouseout.native="provingPrice('expectedPrice')">
                  <template slot="append">
                    <el-select v-model="formOrder.suffix" placeholder="请选择">
                      <el-option
                        v-for="item in option_suffix"
                        :key="item.typename"
                        :label="item.typename"
                        :value="item.typename"
                      />
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">使用油卡：<span class="oilCardRule" @click="showOilRules">(油卡使用规则)</span></label>
                <el-input v-model="formOrder.oilCard" type="number" :min="0" placeholder="请填写油卡金额" style="width: 250px;" @mouseout.native="provingPrice('oilCard')">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="服务要求：">
                <el-checkbox-group v-model="formOrder.service" size="small">
                  <el-checkbox-button v-for="type in option_service" :key="type.typename" :label="type.typename" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注内容：" style="width: 100%;">
                <el-input
                  v-model="formOrder.fnote"
                  type="textarea"
                  placeholder=""
                  show-word-limit
                  style="height:140px;"
                />
              </el-form-item>
            </el-col>
          </div>
        </div>
      </div>
      <div class="ContentCard">
        <div class="totalInfo">
          合计运费：￥{{ formOrder.expectedPriceTxt }} <span class="symbol">-</span> 使用油卡：<span style="color: #D9001B;">￥{{ formOrder.oilCardTxt }}</span> <span class="symbol">=</span> 平台运费：<span style="color: #1890FF;">￥{{ formOrder.price }}</span>
          <span class="btBlock">
            <div class="Bt hoverBtBlue" style="width: 100px;">取消</div>
            <el-button type="primary" size="small" style="width:100px;height:30px;color: #FFFFFF;float: right;margin-top:7px;margin-left: 10px;" @click="submitForm('formOrder')">确认发货</el-button>
          </span>
        </div>
      </div>
    </el-form>
    <!-- 保存发货人信息 -->
    <el-dialog :title="saveType == 'zh' ? '保存发货人信息' : '保存收货人信息'" :visible.sync="dialogVisibleSavePeople" :close-on-click-modal="false" width="650px">
      <div style="padding: 0 40px;">
        <el-form ref="formSavePeople" label-position="right" label-width="100px" :model="formSavePeople" :rules="rulesSavePeople">
          <el-form-item label="城市区域" prop="region">
            <el-select v-model="formSavePeople.provinceId" placeholder="请选择" style="width: 32%;" @change="((value) => { changeProvinceS(value) })">
              <el-option
                v-for="item in option_province"
                :key="item.id"
                :label="item.fname"
                :value="item.id"
              />
            </el-select>
            <el-select v-model="formSavePeople.cityId" placeholder="请选择" style="width: 33%;" @change="((value) => { changeCityS(value) })">
              <el-option
                v-for="item in option_city"
                :key="item.sareacode"
                :label="item.sareaname"
                :value="item.sareacode"
              />
            </el-select>
            <el-select v-model="formSavePeople.areaId" placeholder="请选择" style="width: 33%;" @change="((value) => { changeAreaS(value) })">
              <el-option
                v-for="item in option_area"
                :key="item.fareacode"
                :label="item.fareaname"
                :value="item.fareacode"
              />
            </el-select>
            <!-- <el-input v-model="formSavePeople.region" /> -->
          </el-form-item>
          <el-form-item label="详细地址" prop="addr">
            <el-input v-model="formSavePeople.addr" />
          </el-form-item>
          <el-form-item label="发货人姓名" prop="fpeople">
            <el-input v-model="formSavePeople.fpeople" />
          </el-form-item>
          <el-form-item label="发货人手机" prop="fphone">
            <el-input v-model="formSavePeople.fphone" />
          </el-form-item>
          <el-form-item v-if="saveType == 'zh'" label="提货人姓名" prop="tpeople">
            <el-input v-model="formSavePeople.tpeople" />
          </el-form-item>
          <el-form-item v-if="saveType == 'zh'" label="提货人手机" prop="tphone">
            <el-input v-model="formSavePeople.tphone" />
          </el-form-item>
          <el-form-item v-if="saveType == 'xh'" label="收货人固话" prop="fixedPre">
            <el-input v-model="formSavePeople.fixedTel" placeholder="请输入内容">
              <template slot="prepend">{{ formSavePeople.fixedPre }}</template>
            </el-input>
          </el-form-item>
          <el-form-item label="收货人别名">
            <el-input v-model="formSavePeople.alias" />
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="formSavePeople.company" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="dialogBt" :loading="btLoading" @click="saveContact('formSavePeople')">确 定</el-button>
        <el-button class="dialogBt" @click="dialogVisibleSavePeople = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 选择发货人 -->
    <el-dialog :title="saveType == 'zh' ? '选择发货人' : '选择收货人'" :visible.sync="dialogVisibleChooseFH" :close-on-click-modal="false" width="1010px">
      <el-form :inline="true" :model="formChooseSearch" label-position="top" size="small" class="demo-form-inline">
        <el-form-item :label="saveType == 'zh' ? '发货人姓名：' : '收货人姓名：'">
          <el-input v-model="formChooseSearch.fpeople" style="width: 140px;" />
        </el-form-item>
        <el-form-item :label="saveType == 'zh' ? '发货人电话：' : '收货人电话：'">
          <el-input v-model="formChooseSearch.fphone" style="width: 140px;" />
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input v-model="formChooseSearch.company" style="width: 140px;" />
        </el-form-item>
        <el-form-item label="别名：">
          <el-input v-model="formChooseSearch.alias" style="width: 140px;" />
        </el-form-item>
        <el-form-item v-if="saveType == 'zh'" label="提货人姓名：">
          <el-input v-model="formChooseSearch.tpeople" style="width: 140px;" />
        </el-form-item>
        <el-form-item :label="saveType == 'zh' ? '提货人电话：' : '收货人固话：'">
          <el-input v-model="formChooseSearch.tphone" style="width: 140px;" />
        </el-form-item>
        <div style="float: right;text-align: right;overflow: hidden;margin-top: 42px;">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" style="width:100px;">查询{{ getIndex }}</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-table
        v-if="saveType == 'zh'"
        ref="chooseTable"
        :key="key"
        :data="contractList"
        :loading="tableLoading"
        border
        fit
        highlight-current-row
        :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#F2F2F2',color:'#606266'}"
        style="width: 100%;margin-top: 20px;"
        @row-click="chooseRowClick"
      >
        <!-- <el-table :key="key" :data="contractList" border fit :row-class-name="tableRowClassName" :row-style="selectedHighlight" :header-cell-style="{background:'#F2F2F2',color:'#606266'}" style="width: 100%;margin-top: 20px;" @row-click="chooseRowClick" > -->
        <!-- <el-table-column v-for="pro in formThead" :key="pro" :label="formTheadName[pro]">
          <template slot-scope="scope">
            {{ scope.row[pro] }}
          </template>
        </el-table-column> -->
        <el-table-column
          prop="fpeople"
          label="发货人姓名"
          width="100"
        />
        <el-table-column
          prop="fphone"
          label="发货人电话"
          width="110"
        />
        <el-table-column
          prop="tpeople"
          label="提货人姓名"
          width="100"
        />
        <el-table-column
          prop="tphone"
          label="提货人电话"
          width="110"
        />
        <el-table-column
          prop="region"
          label="城市区域"
          width="160"
        />
        <el-table-column
          prop="addr"
          label="详细地址"
          width="150"
        />
        <el-table-column
          prop="company"
          label="公司名称"
        />
        <el-table-column
          prop="alias"
          label="别名"
        />
      </el-table>
      <el-table
        v-if="saveType == 'xh'"
        ref="chooseTable"
        :key="key"
        :data="contractList"
        :loading="tableLoading"
        border
        fit
        highlight-current-row
        :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#F2F2F2',color:'#606266'}"
        style="width: 100%;margin-top: 20px;"
        @row-click="chooseRowClick"
      >
        <el-table-column
          prop="fpeople"
          label="收货人姓名"
          width="100"
        />
        <el-table-column
          prop="fphone"
          label="收货人电话"
          width="110"
        />
        <el-table-column
          prop="tphone"
          label="收货人固话"
          width="120"
        />
        <el-table-column
          prop="region"
          label="城市区域"
          width="160"
        />
        <el-table-column
          prop="addr"
          label="详细地址"
          width="150"
        />
        <el-table-column
          prop="company"
          label="公司名称"
        />
        <el-table-column
          prop="alias"
          label="别名"
        />
      </el-table>
      <el-pagination
        style="margin-top:10px;"
        :total="sum"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="dialogBt" @click="sureChoosePeople">确 定</el-button>
        <el-button class="dialogBt" @click="dialogVisibleChooseFH = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 油卡规则 -->
    <el-dialog title="油卡使用规则" :visible.sync="dialogVisibleOil" :close-on-click-modal="false" width="550px">
      <div style="margin-bottom: 20px;">
        油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则油卡规则
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="dialogBt" @click="dialogVisibleOil = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import permission from '@/directive/permission/index.js'
import { formatToString, toDecimal2 } from '@/utils'
import { getUserBasicInfo } from '@/utils/auth'
import { getCarType, getCarLong, getProvince, getCity, getArea, getGoodsKind, getService, getContract, submitContact, submitOrder } from '@/api/order'
export default {
  name: 'GeneralAdd',
  components: {
  },
  directives: { permission },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      btLoading: false,
      tableLoading: false,
      key: 1, // table key
      getIndex: null,
      dialogVisibleSavePeople: false,
      dialogVisibleChooseFH: false,
      dialogVisibleOil: false,
      saveType: '',
      curInfoIdx: '', // 装卸信息索引
      startDateDisabled: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      option_vehicleType: [],
      option_vehicleLength: [],
      option_province: [],
      option_city: [],
      option_area: [],
      option_goods: [],
      option_service: [],
      option_suffix: [
        { typename: '元/趟' },
        { typename: '元/吨' },
        { typename: '元/方' },
        { typename: '元/件' }
      ],
      totalWeight: 0,
      totalVolume: 0,
      formOrder: {
        carType: '',
        cusOrderNo: '',
        vehicleType: [],
        vehicleLength: [],
        cusCarLength: '',
        zhInfo: [
          {
            ftype: 0,
            province: '',
            provinceId: '',
            city: '',
            cityId: '',
            area: '',
            areaId: '',
            addr: '',
            fpeople: '',
            fphone: '',
            tpeople: '',
            tphone: '',
            fixedPre: '',
            fixedTel: '',
            alias: '',
            company: '',
            // option_province: [{ label: '--省--', value: '--省--' }, { label: '上海', value: '上海' }],
            option_city: [],
            option_area: [],
            date: '',
            stage: '',
            time: '',
            stageOptions: [],
            timeOptions: [],
            beforeDawn: [1, 2, 3, 4, 5, 6],
            morning: [7, 8, 9, 10, 11, 12],
            afternoon: [13, 14, 15, 16, 17, 18],
            night: [19, 20, 21, 22, 23, 24]
          }
        ],
        xhInfo: [
          {
            ftype: 1,
            province: '',
            provinceId: '',
            city: '',
            cityId: '',
            area: '',
            areaId: '',
            addr: '',
            fpeople: '',
            fphone: '',
            tpeople: '',
            tphone: '',
            fixedPre: '',
            fixedTel: '',
            alias: '',
            company: '',
            // option_province: [{ label: '--省--', value: '--省--' }, { label: '上海', value: '上海' }],
            option_city: [],
            option_area: [],
            date: '',
            stage: '',
            time: '',
            stageOptions: [],
            timeOptions: [],
            beforeDawn: [1, 2, 3, 4, 5, 6],
            morning: [7, 8, 9, 10, 11, 12],
            afternoon: [13, 14, 15, 16, 17, 18],
            night: [19, 20, 21, 22, 23, 24]
          }
        ],
        goods: [
          {
            code: '',
            kind: '',
            name: '',
            weight: 0,
            volume: 0,
            norms: '',
            number: '',
            unit: ''
          }
        ],
        expectedPrice: '',
        expectedPriceTxt: '0.00',
        suffix: '元/趟',
        oilCard: '',
        oilCardTxt: '0.00',
        price: '0.00',
        service: [],
        fnote: ''
      },
      rulesOrder: {
        carType: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        vehicleType: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        vehicleLength: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        areaId: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        addr: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        fpeople: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        fphone: [
          { required: true, message: ' ', trigger: 'blur', validator: validatePhone }
        ],
        tpeople: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        tphone: [
          { required: true, message: ' ', trigger: 'blur', validator: validatePhone }
        ],
        fixedTel: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        date: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        stage: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        time: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        code: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        kind: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        name: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        weight: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        volume: [
          { required: true, message: ' ', trigger: 'change' }
        ]
      },
      formSavePeople: {
        province: '',
        provinceId: '',
        city: '',
        cityId: '',
        area: '',
        areaId: '',
        region: '',
        addr: '',
        fpeople: '',
        fphone: '',
        tpeople: '',
        tphone: '',
        alias: '',
        company: ''
      },
      rulesSavePeople: {
        region: [
          { required: true, message: '请填写城市区域', trigger: 'change' }
        ],
        addr: [
          { required: true, message: '请填写详细地址', trigger: 'change' }
        ],
        fpeople: [
          { required: true, message: '请填写发货人姓名', trigger: 'change' }
        ],
        fphone: [
          { required: true, message: '请填写发货人手机', trigger: 'change' }
        ],
        tpeople: [
          { required: true, message: '请填写提货人姓名', trigger: 'change' }
        ],
        tphone: [
          { required: true, message: '请填写提货人手机', trigger: 'change' }
        ]
      },
      formChooseSearch: {
        fpeople: '',
        fphone: '',
        company: '',
        alias: '',
        tpeople: '',
        tphone: ''
      },
      formTheadName: {
        fpeople: '发货人姓名',
        fphone: '发货人电话',
        tpeople: '提货人姓名',
        tphone: '提货人电话',
        region: '城市区域',
        addr: '详细地址',
        company: '公司名称',
        alias: '别名'
      },
      formThead: ['fpeople', 'fphone', 'tpeople', 'tphone', 'region', 'addr', 'company', 'alias'],
      currentPage: 1,
      pageSize: 5,
      sum: 0,
      contractList: [],
      choosedRow: {}
    }
  },
  watch: {
    'formOrder.goods': {
      handler: function(newVal) {
        let totalWeight = 0
        let totalVolume = 0
        newVal.map(item => {
          totalWeight += Number(item.weight)
          totalVolume += Number(item.volume)
        })
        this.totalWeight = totalWeight
        this.totalVolume = totalVolume
      },
      deep: true
    },
    'formOrder.expectedPrice': function(newVal) {
      this.formOrder.expectedPriceTxt = toDecimal2(newVal) || '0.00'
      this.formOrder.price = toDecimal2(newVal - this.formOrder.oilCard)
    },
    'formOrder.oilCard': function(newVal) {
      this.formOrder.oilCardTxt = toDecimal2(newVal) || '0.00'
      this.formOrder.price = toDecimal2(this.formOrder.expectedPrice - newVal)
    },
    dialogVisibleChooseFH: function(newVal) {
      if (!newVal) {
        this.$refs.chooseTable.setCurrentRow()
      }
    }
  },
  created() {
    this.getCarType()
    this.getCarLong()
    this.initOptionsProvince()
    this.getGoodsKind()
    this.getService()
    // 默认带出发货人姓名和电话
    this.formOrder.zhInfo[0].fpeople = getUserBasicInfo().username
    this.formOrder.zhInfo[0].fphone = getUserBasicInfo().fmobile
  },
  methods: {
    provingPrice(pro) {
      // this.formOrder[pro] = Number(this.formOrder[pro])
      const reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
      if (!reg.test(this.formOrder[pro])) {
        this.formOrder[pro] = ''
      }
    },
    provingWV(idx, type) {
      this.formOrder.goods[idx][type] = Number(this.formOrder.goods[idx][type])
    },
    tableRowClassName({ row, rowIndex }) {
      // row.index = rowIndex
      if (rowIndex % 2 === 0) {
        return ''
      } else {
        return 'grayRow'
      }
    },
    headerCellClassName({ row, columnIndex }) {
      if (columnIndex < 4) {
        return 'Require'
      } else {
        return ''
      }
    },
    customerCarLength(event) {
      if (event.target.value.trim()) {
        // 车长查重
        const ifHasDuplicate = this.ifHasDuplicate(event.target.value.trim() + '米')
        if (ifHasDuplicate === undefined) {
          this.option_vehicleLength.push({ carLength: event.target.value + '米' })
        } else {
          this.$message({
            message: '该车长已存在，可以直接选择！',
            type: 'warning'
          })
        }
        this.formOrder.cusCarLength = ''
      }
    },
    ifHasDuplicate(len) {
      const dp = this.option_vehicleLength.find((carLen) => {
        if (carLen.carLength === len) {
          return carLen
        }
      })
      return dp
    },
    showOilRules() {
      this.dialogVisibleOil = true
    },
    chooseRowClick(row) {
      this.choosedRow = row
    },
    sureChoosePeople() {
      if (this.choosedRow === {}) {
        this.dialogVisibleChooseFH = false
      } else {
        const type = this.saveType
        const idx = this.curInfoIdx
        const choosedRow = this.choosedRow
        // const regionArr = choosedRow.region.split('-')
        this.formOrder[type + 'Info'][idx].province = choosedRow.province
        this.formOrder[type + 'Info'][idx].provinceId = choosedRow.provinceId
        this.formOrder[type + 'Info'][idx].city = choosedRow.city
        this.formOrder[type + 'Info'][idx].cityId = choosedRow.cityId
        this.formOrder[type + 'Info'][idx].area = choosedRow.area
        this.formOrder[type + 'Info'][idx].areaId = choosedRow.areaId
        this.formOrder[type + 'Info'][idx].addr = choosedRow.addr
        this.formOrder[type + 'Info'][idx].fpeople = choosedRow.fpeople
        this.formOrder[type + 'Info'][idx].fphone = choosedRow.fphone
        this.formOrder[type + 'Info'][idx].tpeople = choosedRow.tpeople
        this.formOrder[type + 'Info'][idx].tphone = choosedRow.tphone
        this.formOrder[type + 'Info'][idx].fixedTel = choosedRow.tphone
        this.formOrder[type + 'Info'][idx].fixedPre = choosedRow.fixedPre || ''
        this.formOrder[type + 'Info'][idx].alias = choosedRow.alias
        this.formOrder[type + 'Info'][idx].company = choosedRow.company
        this.dialogVisibleChooseFH = false
        getCity({ pid: choosedRow.provinceId, fname: choosedRow.province }).then(res => {
          this.formOrder[type + 'Info'][idx].option_city = res.data
        })
        getArea({ pid: choosedRow.cityId, fname: choosedRow.city }).then(res => {
          this.formOrder[type + 'Info'][idx].option_area = res.data
        })
      }
    },
    // selectedHighlight({row, rowIndex}) {
    //   if ((this.getIndex) === rowIndex ) {
    //     return {
    //       "background-color": "#1890ff"
    //     }
    //   }
    // },
    handleSizeChange(val) {
      this.pageSize = val
      this.choosePeople(this.curInfoIdx, this.saveType, false)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.choosePeople(this.curInfoIdx, this.saveType, false)
    },
    changeCarType(val, CarType) {
      // 判断是否含有不限车长
      if (val && CarType.typename === '不限车型') {
        this.formOrder.vehicleType = ['不限车型']
      }
      // 选择具体车长后将不限车长移除
      if (val && CarType.typename !== '不限车型' && this.formOrder.vehicleType.indexOf('不限车型') !== -1) {
        this.formOrder.vehicleType.splice(this.formOrder.vehicleType.indexOf('不限车型'), 1)
      }
    },
    // 点击车长显示详情
    showTips(val, CarLong) {
      // 判断是否含有不限车长
      if (val && CarLong.carLength === '不限车长') {
        this.formOrder.vehicleLength = ['不限车长']
      }
      // 选择具体车长后将不限车长移除
      if (val && CarLong.carLength !== '不限车长' && this.formOrder.vehicleLength.indexOf('不限车长') !== -1) {
        this.formOrder.vehicleLength.splice(this.formOrder.vehicleLength.indexOf('不限车长'), 1)
      }
      // 获取tips
      // if (val && CarLong.carLength !== '不限车长') {
      //   this.send({
      //     name: '/zCarLengthController/' + CarLong.id,
      //     method: 'GET'
      //   }).then(res => {
      //     if (res.data.respCode === '0') {
      //       let CarInfo = res.data.data
      //       this.$message.closeAll()
      //       this.$message('车长' + CarInfo.carLength + ',约有' + CarInfo.loadVolume + ',可装货约' + CarInfo.loadWeight)
      //     } else {
      //       this.$message({
      //         message: res.data.message + '！',
      //         type: 'error'
      //       })
      //     }
      //   }).catch((res) => {
      //     console.log(res)
      //   })
      // }
    },
    changeDate(val, idx, pro) {
      // console.log(val, idx)
      if (val) {
        const tmp = { ...this.formOrder[pro + 'Info'][idx] }
        tmp.stage = ''
        tmp.time = ''
        const CurDate = new Date()
        const CurHour = CurDate.getHours()
        const CurDateSrting = formatToString(CurDate, 'Simple', '-')
        if (CurDateSrting !== val) { // 今天往后的日期
          tmp.stageOptions = [
            { label: '全天', value: '全天' },
            { label: '凌晨', value: '凌晨' },
            { label: '上午', value: '上午' },
            { label: '下午', value: '下午' },
            { label: '晚上', value: '晚上' }
          ]
        } else { // 今天
          if (CurHour < 1) { // 所有时间段都可以
            tmp.stageOptions = [
              { label: '全天', value: '全天' },
              { label: '凌晨', value: '凌晨' },
              { label: '上午', value: '上午' },
              { label: '下午', value: '下午' },
              { label: '晚上', value: '晚上' }
            ]
          } else if (CurHour >= 1 && CurHour < 6) {
            tmp.stageOptions = [
              { label: '凌晨', value: '凌晨' },
              { label: '上午', value: '上午' },
              { label: '下午', value: '下午' },
              { label: '晚上', value: '晚上' }
            ]
          } else if (CurHour >= 6 && CurHour < 12) {
            tmp.stageOptions = [
              { label: '上午', value: '上午' },
              { label: '下午', value: '下午' },
              { label: '晚上', value: '晚上' }
            ]
          } else if (CurHour >= 12 && CurHour < 18) {
            tmp.stageOptions = [
              { label: '下午', value: '下午' },
              { label: '晚上', value: '晚上' }
            ]
          } else {
            tmp.stageOptions = [
              { label: '晚上', value: '晚上' }
            ]
          }
        }
        this.formOrder[pro + 'Info'][idx].stage = tmp.stage
        this.formOrder[pro + 'Info'][idx].time = tmp.time
        this.formOrder[pro + 'Info'][idx].stageOptions = tmp.stageOptions
        // console.log(tmp.stageOptions)
        // console.log(this.formOrder.zhInfo[idx].stageOptions)
      } else {
        this.formOrder[pro + 'Info'][idx].stage = ''
        this.formOrder[pro + 'Info'][idx].time = ''
        this.formOrder[pro + 'Info'][idx].stageOptions = []
      }
    },
    changeStage(val, idx, pro) {
      if (val) {
        const tmp = { ...this.formOrder[pro + 'Info'][idx] }
        tmp.time = ''
        const CurDate = new Date()
        const CurHour = CurDate.getHours()
        const CurDateSrting = formatToString(CurDate, 'Simple', '-')
        if (CurDateSrting !== tmp.date) { // 今天往后的日期
          switch (val) {
            case '全天':
              tmp.timeOptions = ['都可以']
              break
            case '凌晨':
              tmp.timeOptions = ['都可以', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00']
              break
            case '上午':
              tmp.timeOptions = ['都可以', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']
              break
            case '下午':
              tmp.timeOptions = ['都可以', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
              break
            case '晚上':
              tmp.timeOptions = ['都可以', '19:00', '20:00', '21:00', '22:00', '23:00']
              break
          }
        } else { // 今天
          switch (val) {
            case '全天':
              tmp.timeOptions = ['都可以']
              break
            case '凌晨':
              tmp.timeOptions = []
              if (CurHour < 1) {
                tmp.timeOptions.push('都可以')
                tmp.beforeDawn.map(item => {
                  tmp.timeOptions.push(this.formatHour(item))
                })
              } else {
                tmp.beforeDawn.map(item => {
                  if (item > CurHour) {
                    tmp.timeOptions.push(this.formatHour(item))
                  }
                })
              }
              break
            case '上午':
              tmp.timeOptions = []
              if (CurHour < 7) {
                tmp.timeOptions.push('都可以')
                tmp.morning.map(item => {
                  tmp.timeOptions.push(this.formatHour(item))
                })
              } else {
                tmp.morning.map(item => {
                  if (item > CurHour) {
                    tmp.timeOptions.push(this.formatHour(item))
                  }
                })
              }
              break
            case '下午':
              tmp.timeOptions = []
              if (CurHour < 13) {
                tmp.timeOptions.push('都可以')
                tmp.afternoon.map(item => {
                  tmp.timeOptions.push(this.formatHour(item))
                })
              } else {
                tmp.afternoon.map(item => {
                  if (item > CurHour) {
                    tmp.timeOptions.push(this.formatHour(item))
                  }
                })
              }
              break
            case '晚上':
              tmp.timeOptions = []
              if (CurHour < 19) {
                tmp.timeOptions.push('都可以')
                tmp.night.map(item => {
                  tmp.timeOptions.push(this.formatHour(item))
                })
              } else {
                tmp.night.map(item => {
                  if (item > CurHour) {
                    tmp.timeOptions.push(this.formatHour(item))
                  }
                })
              }
              break
          }
        }
        this.formOrder[pro + 'Info'][idx].time = tmp.time
        this.formOrder[pro + 'Info'][idx].timeOptions = tmp.timeOptions
      } else {
        this.formOrder[pro + 'Info'][idx].time = ''
        this.formOrder[pro + 'Info'][idx].timeOptions = []
      }
    },
    formatHour(num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num + ':00'
    },
    twoPeopleSame(idx) {
      this.formOrder.zhInfo[idx].tpeople = this.formOrder.zhInfo[idx].fpeople
      this.formOrder.zhInfo[idx].tphone = this.formOrder.zhInfo[idx].fphone
    },
    copyInfo(idx, type) {
      const tmp = { ...this.formOrder[type + 'Info'][idx] }
      this.formOrder[type + 'Info'].push(tmp)
    },
    addZX(type) {
      this.formOrder[type + 'Info'].push({
        ftype: type === 'zh' ? 0 : 1, // 0-发货 1-卸货
        province: '',
        city: '',
        area: '',
        addr: '',
        fpeople: '',
        fphone: '',
        tpeople: '',
        tphone: '',
        fixedPre: '',
        fixedTel: '',
        alias: '',
        company: '',
        option_province: [{ label: '--省--', value: '--省--' }, { label: '上海', value: '上海' }],
        option_city: [{ label: '--市--', value: '--市--' }, { label: '上海市', value: '上海市' }],
        option_area: [{ label: '--区/县--', value: '--区/县--' }],
        date: '',
        stage: '',
        time: '',
        stageOptions: [],
        timeOptions: [],
        beforeDawn: [1, 2, 3, 4, 5, 6],
        morning: [7, 8, 9, 10, 11, 12],
        afternoon: [13, 14, 15, 16, 17, 18],
        night: [19, 20, 21, 22, 23, 24]
      })
    },
    removeZX(idx, type) {
      this.formOrder[type + 'Info'].splice(idx, 1)
    },
    savePeople(idx, type) {
      this.saveType = type
      this.curInfoIdx = idx
      const tmp = this.formOrder[type + 'Info'][idx]
      this.dialogVisibleSavePeople = true
      this.formSavePeople = {
        province: tmp.province,
        provinceId: tmp.provinceId,
        city: tmp.city,
        cityId: tmp.cityId,
        area: tmp.area,
        areaId: tmp.areaId,
        region: tmp.province + '-' + tmp.city + '-' + tmp.area,
        addr: tmp.addr,
        fpeople: tmp.fpeople,
        fphone: tmp.fphone,
        tpeople: tmp.tpeople || '',
        tphone: tmp.tphone || '',
        fixedPre: tmp.fixedPre || '',
        fixedTel: tmp.fixedTel || '',
        alias: tmp.alias,
        company: tmp.company
      }
      setTimeout(() => { this.$refs['formSavePeople'].clearValidate() }, 100)
      getCity({ pid: tmp.provinceId, fname: tmp.province }).then(res => {
        this.option_city = res.data
      })
      getArea({ pid: tmp.cityId, fname: tmp.city }).then(res => {
        this.option_area = res.data
      })
    },
    saveContact(formName) {
      if (this.saveType === 'zh') {
        if (!this.formSavePeople.area || !this.formSavePeople.addr || !this.formSavePeople.fpeople || !this.formSavePeople.fphone || !this.formSavePeople.tpeople || !this.formSavePeople.tphone) {
          this.$message({
            message: '请将发货人信息填写完整再保存！',
            type: 'warning'
          })
        } else {
          this.submitContact()
        }
      } else {
        if (!this.formSavePeople.area || !this.formSavePeople.addr || !this.formSavePeople.fpeople || !this.formSavePeople.fphone) {
          this.$message({
            message: '请将收货人信息填写完整再保存！',
            type: 'warning'
          })
        } else {
          this.submitContact()
        }
      }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     this.$message({
      //       message: '请将信息填写完整！',
      //       type: 'warning'
      //     })
      //     return false
      //   }
      // })
    },
    submitContact() {
      this.btLoading = true
      const tmp = {
        faddress: this.formSavePeople.addr,
        fareacode: this.formSavePeople.areaId,
        fareaname: this.formSavePeople.area,
        fid: getUserBasicInfo().userID,
        fmobile: this.formSavePeople.fphone,
        fmobile1: this.saveType === 'zh' ? this.formSavePeople.tphone : this.formSavePeople.fixedPre + '—' + this.formSavePeople.fixedTel,
        fname: this.formSavePeople.fpeople,
        fname1: this.formSavePeople.tpeople,
        fpoint: this.formSavePeople.alias,
        ftype: this.saveType === 'zh' ? 0 : 1,
        // id: "string",
        // issame: 0,
        // lat: '',
        // lng: '',
        pareacode: this.formSavePeople.provinceId,
        pareaname: this.formSavePeople.province,
        sareacode: this.formSavePeople.cityId,
        sareaname: this.formSavePeople.city
      }
      submitContact(tmp).then(res => {
        if (res.respCode === '0') {
          this.$message({
            message: this.saveType === 'zh' ? '发货人保存成功！' : '收货人保存成功！',
            type: 'success'
          })
          // 返回填充
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].province = this.formSavePeople.province
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].provinceId = this.formSavePeople.provinceId
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].city = this.formSavePeople.city
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].cityId = this.formSavePeople.cityId
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].area = this.formSavePeople.area
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].areaId = this.formSavePeople.areaId
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].addr = this.formSavePeople.addr
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].fpeople = this.formSavePeople.fpeople
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].fphone = this.formSavePeople.fphone
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].tpeople = this.formSavePeople.tpeople
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].tphone = this.formSavePeople.tphone
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].fixedPre = this.formSavePeople.fixedPre
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].fixedTel = this.formSavePeople.fixedTel
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].option_city = this.option_city
          this.formOrder[this.saveType + 'Info'][this.curInfoIdx].option_area = this.option_area
          this.dialogVisibleSavePeople = false
        } else {
          this.$message({
            message: this.saveType === 'zh' ? '发货人保存失败！' : '收货人保存失败！',
            type: 'error'
          })
        }
        this.btLoading = false
      })
    },
    choosePeople(idx, type, ifInit) {
      this.tableLoading = true
      if (ifInit) {
        this.currentPage = 1
      }
      this.choosedRow = {}
      this.saveType = type
      this.curInfoIdx = idx
      getContract({ currentPage: this.currentPage, pageSize: this.pageSize, userId: getUserBasicInfo().userID, type: type === 'zh' ? 0 : 1 }).then((res) => {
        this.contractList = res.data.map(item => {
          const tmp = {
            province: item.pareaname,
            provinceId: item.pareacode,
            city: item.sareaname,
            cityId: item.sareacode,
            area: item.fareaname,
            areaId: item.fareacode,
            fpeople: item.fname,
            fphone: item.fmobile,
            tpeople: item.fname1,
            tphone: item.fmobile1,
            fixedPre: item.citycode,
            fixedTel: item.fmobile1,
            region: item.pareaname + '-' + item.sareaname + '-' + item.fareaname,
            addr: item.faddress,
            company: '',
            alias: item.fpoint
          }
          return tmp
        })
        this.sum = res.size
        this.tableLoading = false
      })
      this.dialogVisibleChooseFH = true
    },
    addGoods() {
      this.formOrder.goods.push({
        kind: '',
        name: '',
        weight: 0,
        volume: 0,
        norms: '',
        number: '',
        unit: ''
      })
    },
    goodsDel(idx, row) {
      this.formOrder.goods.splice(idx, 1)
    },
    changeGoodsType(val, idx) {
      this.option_goods.find(Goods => {
        if (Goods.id === val) {
          this.formOrder.goods[idx].kind = Goods.fname
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.compareDateTime()) {
            this.$message({
              message: '卸货时间不能早于装货时间！',
              type: 'warning'
            })
            return false
          }
          if (this.formOrder.zhInfo.length > 3 || this.formOrder.xhInfo.length > 3) {
            this.$message({
              message: '目前最多支持三装三卸！',
              type: 'warning'
            })
            return false
          }
          if (this.formOrder.goods.length === 0) {
            this.$message({
              message: '请添加货物信息！',
              type: 'warning'
            })
            return false
          }
          const zhInfoTmp = this.formOrder.zhInfo.map((Info, idx) => {
            return {
              fname: Info.fpeople,
              faddress: Info.addr,
              fmobile: Info.fphone,
              issame: '',
              fname1: Info.tpeople,
              fmobile1: Info.tphone,
              ftype: Info.ftype,
              forder: idx,
              zhtime: this.formatTimeStr(Info.date, Info.stage, Info.time),
              xhtime: '',
              fareacode: Info.areaId,
              fareaname: Info.area,
              sareacode: Info.cityId,
              sareaname: Info.city,
              pareacode: Info.provinceId,
              pareaname: Info.province
            }
          })
          const xhInfoTmp = this.formOrder.xhInfo.map((Info, idx) => {
            return {
              fname: Info.fpeople,
              faddress: Info.addr,
              fmobile: Info.fphone,
              issame: '',
              fname1: '',
              fmobile1: Info.fixedPre + '—' + Info.fixedTel,
              ftype: Info.ftype,
              forder: idx,
              zhtime: '',
              xhtime: this.formatTimeStr(Info.date, Info.stage, Info.time),
              fareacode: Info.areaId,
              fareaname: Info.area,
              sareacode: Info.cityId,
              sareaname: Info.city,
              pareacode: Info.provinceId,
              pareaname: Info.province
            }
          })
          const DATA = {
            use_cartype: this.formOrder.carType,
            customer_orderno: this.formOrder.cusOrderNo,
            cartype: this.splicing(this.formOrder.vehicleType, null, '/'),
            carlength: this.splicing(this.formOrder.vehicleLength, null, '/'),
            fmainid: getUserBasicInfo().usercode,
            fid: getUserBasicInfo().userID,
            goodsname: this.splicing(this.formOrder.goods, 'kind', '|'),
            goodscode: this.splicing(this.formOrder.goods, 'code', ','),
            fvolume: this.totalVolume,
            fweight: this.totalWeight,
            ffee: this.formOrder.expectedPriceTxt,
            foilcard: this.formOrder.oilCard,
            require_fnote: this.splicing(this.formOrder.service, null, '|'),
            fnote: this.formOrder.fnote,
            zx_type: this.formOrder.zhInfo.length + '装' + this.formOrder.xhInfo.length + '卸',
            goodstype: 1,
            iscf: 0,
            goodslist: this.formOrder.goods.map(goods => {
              return {
                goodscode: goods.code,
                goodskind: goods.kind,
                goodsname: goods.name,
                fweight: goods.weight,
                fvolume: goods.volume,
                fmodel: goods.norms,
                amount: goods.number,
                unit: goods.unit
              }
            }),
            orderContact: zhInfoTmp.concat(xhInfoTmp)
          }
          this.btLoading = true
          // console.log(Qs.stringify(DATA))
          submitOrder(DATA).then(res => {
            if (res.respCode === '0') {
              this.$message({
                message: '订单的提交成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '订单的提交失败！',
                type: 'error'
              })
            }
            this.btLoading = false
          })
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 拼接
    splicing(arr, pro, symbolStr) {
      let SplicdString = ''
      arr.map(item => {
        SplicdString = SplicdString + symbolStr + (pro ? item[pro] : item)
      })
      return SplicdString.substring(1)
    },
    // 装卸货时间
    formatTimeStr(date, stage, time) {
      switch (stage) {
        case '全天':
          return date + ' 23:59:00'
        case '凌晨':
          if (time === '都可以') {
            return date + ' 06:30:00'
          } else {
            return date + ' ' + time + ':00'
          }
        case '上午':
          if (time === '都可以') {
            return date + ' 12:30:00'
          } else {
            return date + ' ' + time + ':00'
          }
        case '下午':
          if (time === '都可以') {
            return date + ' 18:30:00'
          } else {
            return date + ' ' + time + ':00'
          }
        case '晚上':
          if (time === '都可以') {
            return date + ' 23:58:00'
          } else {
            return date + ' ' + time + ':00'
          }
        default:
          return ''
      }
    },
    compareDateTime() {
      const dateTimeZ = this.formOrder.zhInfo.map(item => {
        if (item.time === '都可以') {
          switch (item.stage) {
            case '全天':
              return (new Date(item.date + ' 23:59')).getTime()
            case '凌晨':
              return (new Date(item.date + ' 06:30')).getTime()
            case '上午':
              return (new Date(item.date + ' 12:30')).getTime()
            case '下午':
              return (new Date(item.date + ' 18:30')).getTime()
            case '晚上':
              return (new Date(item.date + ' 23:58')).getTime()
          }
        } else {
          return (new Date(item.date + ' ' + item.time)).getTime()
        }
      })
      const dateTimeX = this.formOrder.xhInfo.map(item => {
        if (item.time === '都可以') {
          switch (item.stage) {
            case '全天':
              return (new Date(item.date + ' 23:59')).getTime()
            case '凌晨':
              return (new Date(item.date + ' 06:30')).getTime()
            case '上午':
              return (new Date(item.date + ' 12:30')).getTime()
            case '下午':
              return (new Date(item.date + ' 18:30')).getTime()
            case '晚上':
              return (new Date(item.date + ' 23:58')).getTime()
          }
        } else {
          return (new Date(item.date + ' ' + item.time)).getTime()
        }
      })
      return Math.min(...dateTimeX) <= Math.min(...dateTimeZ)
    },
    changeProvince(val, idx, type, ifclear) {
      let fname = ''
      this.option_province.find(Province => {
        if (Province.id === val) {
          fname = Province.fname
          this.formOrder[type + 'Info'][idx].province = Province.fname
          getCity({ pid: val, fname: fname }).then(res => {
            this.formOrder[type + 'Info'][idx].option_city = res.data
          })
          if (ifclear === 0) {
            this.formOrder[type + 'Info'][idx].city = ''
            this.formOrder[type + 'Info'][idx].cityId = ''
            this.formOrder[type + 'Info'][idx].area = ''
            this.formOrder[type + 'Info'][idx].areaId = ''
            this.formOrder[type + 'Info'][idx].option_area = []
          }
        }
      })
      // console.log(val, this.formOrder[type + 'Info'][idx].province, this.formOrder[type + 'Info'][idx].provinceId)
    },
    changeCity(val, idx, type, ifclear) {
      let fname = ''
      this.formOrder[type + 'Info'][idx].option_city.find(City => {
        if (City.sareacode === val) {
          fname = City.sareaname
          this.formOrder[type + 'Info'][idx].city = City.sareaname
          getArea({ pid: val, fname: fname }).then(res => {
            this.formOrder[type + 'Info'][idx].option_area = res.data
          })
          if (ifclear === 0) {
            this.formOrder[type + 'Info'][idx].area = ''
            this.formOrder[type + 'Info'][idx].areaId = ''
            this.formOrder[type + 'Info'][idx].option_area = []
          }
        }
      })
    },
    changeArea(val, idx, type) {
      this.formOrder[type + 'Info'][idx].option_area.find(Area => {
        if (Area.fareacode === val) {
          this.formOrder[type + 'Info'][idx].area = Area.fareaname
          this.formOrder[type + 'Info'][idx].fixedPre = Area.city_code
        }
      })
    },
    changeProvinceS(val) {
      let fname = ''
      this.option_province.find(Province => {
        if (Province.id === val) {
          fname = Province.fname
          this.formSavePeople.province = Province.fname
          getCity({ pid: val, fname: fname }).then(res => {
            this.option_city = res.data
          })
          this.formSavePeople.city = ''
          this.formSavePeople.cityId = ''
          this.formSavePeople.area = ''
          this.formSavePeople.areaId = ''
          this.option_area = []
        }
      })
    },
    changeCityS(val) {
      let fname = ''
      this.option_city.find(City => {
        if (City.sareacode === val) {
          fname = City.sareaname
          this.formSavePeople.city = City.sareaname
          getArea({ pid: val, fname: fname }).then(res => {
            this.option_area = res.data
          })
          this.formSavePeople.area = ''
          this.formSavePeople.areaId = ''
          this.option_area = []
        }
      })
    },
    changeAreaS(val) {
      this.option_area.find(Area => {
        if (Area.fareacode === val) {
          this.formSavePeople.area = Area.fareaname
          this.formSavePeople.fixedPre = Area.city_code
        }
      })
    },
    getCarType() {
      getCarType().then(res => {
        this.option_vehicleType = res.data
      })
    },
    getCarLong() {
      getCarLong().then(res => {
        this.option_vehicleLength = res.data
      })
    },
    getGoodsKind() {
      getGoodsKind().then(res => {
        this.option_goods = res.data
      })
    },
    getService() {
      getService().then(res => {
        this.option_service = res.data
      })
    },
    initOptionsProvince(val) {
      getProvince().then(res => {
        this.option_province = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$rightBtBlockWidth: 270px;
$primaryBlue: #1890FF;
.GeneralAdd{
  padding: 0px 10px;
  overflow-x: hidden;
  .ContentCard{
    width: 100%;
    float: left;
    /*background: #FFFFFF;*/
    margin-bottom: 10px;
    .ColumTitBar{
      padding: 0 20px;
      height: 45px;
      background: #FFFFFF;
      line-height: 45px;
      font-weight: bold;
      border-bottom: 1px solid #D7D7D7;
      span{
        float: left;
      }
      .ColumTxt{
        font-size: 14px;
        font-weight: bold;
        &::before{
          content: '';
          width: 6px;
          height: 24px;
          margin-top: 9px;
          margin-right: 5px;
          background: #2196F3;
          float: left;
        }
      }
      span:nth-child(2){
        font-size: 14px;
        font-weight: 400;
        color: #D9001B;
        padding-left: 5px;
      }
      .CountNo{
        width: 100px;
        height: 30px;
        display: inline-block;
        border-radius: 3px;
        text-align: center;
        line-height: 30px;
        background: #F59A23;
        font-size: 12px;
        color: #FFFFFF;
        font-weight: 400;
        padding-left: 0px;
        margin-left: 20px;
        margin-top: 7px;
      }
      .CountGoods{
        width: 100px;
        height: 30px;
        display: inline-block;
        border-radius: 3px;
        text-align: center;
        line-height: 30px;
        background: #F59A23;
        font-size: 12px;
        color: #FFFFFF;
        font-weight: 400;
        padding-left: 0px;
        margin-left: 20px;
        margin-top: 7px;
        span{
          width: 30px;
          height: 30px;
          border-left: 1px solid #FFFFFF;
          float: right;
        }
      }
    }
    .ContentBlock{
      width: 100%;
      float: left;
      .AddrInfoBlock{
        float: left;
        padding: 10px 0;
        background: #FFFFFF;
        margin-bottom: 10px;
        .IndexBlock{
          width: 20px;
          height: 20px;
          line-height: 20px;
          background: $primaryBlue;
          border-radius: 50%;
          float: left;
          text-align: center;
          margin: 0 5px;
          color: #FFFFFF;
          font-size: 12px;
        }
        .AddrMian{
          width: calc(100% - 30px);
          padding-right: 20px;
          float: right;
          .leftInfoBlock{
            width:calc(100% - #{$rightBtBlockWidth});
            float:left;
            .el-select{
              width: 32%;
            }
            .addrInput{
              width: 39%;
            }
          }
          .rightBtBlock{
            width: $rightBtBlockWidth;
            float: right;
            text-align: right;
            overflow: hidden;
            /*margin-top: 30px;*/
          }
          .dateBlock{
            width: 100%;
            display: block;
            float: left;
          }
        }
      }
      .GoodsInfo{
        width: 100%;
        float: left;
        padding: 0 20px;
        background: #FFFFFF;
      }
    }
    .Bt{
      width: 120px;
      height: 30px;
      font-size: 13px;
      color: #7F7F7F;
      font-weight: 400;
      display: inline-block;
      float: right;
      text-align: center;
      line-height: 30px;
      border: 1px solid #7F7F7F;
      border-radius: 3px;
      margin-left: 10px;
      margin-top: 7px;
      cursor: pointer;
    }
    .totalInfo{
      width: 100%;
      height: 80px;
      text-align: right;
      line-height: 80px;
      background: #FFFFFF;
      font-size: 20px;
      color: #555555;
      font-weight: bold;
      .symbol{
        padding: 0 20px;
      }
      .btBlock{
        height: 44px;
        margin-top: 18px;
        margin-left: 40px;
        float: right;
        padding-right: 20px;
      }
    }
  }
}
.oilCardRule{
  font-size: 12px;
  cursor: pointer;
}
.dialogBt{
  border-radius: 0px;
  width: 150px;
  height: 44px;
}
.el-pagination{
  text-align: right;
}
</style>
