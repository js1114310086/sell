<template>
  <div>
    <sub-title :subTitle="'物流追踪'" :isRefresh="false"></sub-title>
    <div class="body">
      <!--<div class="filter-wrap">
               <div class="box-title flex between h-center">
                <span class="font-20">物流追踪</span>
              </div>
                <div class="flex h-center between">
                  <div>
                    <img src="@/assets/order/search.png"> <span class="font-14 gray">筛选查询</span>
                  </div>
                  <div class="search-wrap">
                      <span class="font-14 gray" @click="showSearch" v-show="!visibleSearch">
                      <i class="el-icon-arrow-down"></i>
                      打开筛选</span>
                    <span class="font-14 gray" @click="showSearch"  v-show="visibleSearch">
                      <i class="el-icon-arrow-up"></i>
                      收起筛选</span>
                    <button class="mall-btn search" @click="search()">查询结果</button>
                  </div>
                </div>
                <div class="flex h-center" v-show="visibleSearch">
                   &lt;!&ndash; <span class="font-14 gray">活动名称:</span>
                  <el-input v-model="input" placeholder="订单编号/商品货号" class="search-input"></el-input> &ndash;&gt;
                  <span class="font-14 gray">订单号:</span>
                  <el-input v-model="searchcode" placeholder="订单号" class="search-input">
                  </el-input>
                </div>
      </div>-->
      <div class="box-title flex between h-center">
        <span class="font-20">数据列表</span>
        <div class="flex h-center">
          <button class="mall-btn">物流追踪</button>
          <!-- <el-select v-model="input" placeholder="显示条数" class="search-input">
                    <el-option key="1" value="1" label="1"></el-option>
                  </el-select>
                  <el-select v-model="input" placeholder="排序方式" class="search-input">
                    <el-option key="1" value="1" label="1"></el-option>
          </el-select>-->
        </div>
      </div>
      <el-table
        class="mall-table"
        :data="tableData"
        :header-cell-style="headerStyle"
        :cell-style="tdStyle"
      >
        <!-- <el-table-column
                      type="selection"
                      width="55">
        </el-table-column>-->
        <el-table-column label="订单号" width="130">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column label="公司名称" width="140">
          <template slot-scope="scope">{{ scope.row.sendCompany }}</template>
        </el-table-column>
        <el-table-column label="快递单号" width="130">
          <template slot-scope="scope">{{ scope.row.sendCode }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="130">
          <template slot-scope="scope">{{ scope.row.sendTime}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="table-btn" @click="update(scope.row.id)">编辑</span>
            <span class="table-btn" @click="deleted(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination @next="next" :isBatch="false" :total="total"></pagination>
      <el-dialog title="订单发货" :visible.sync="dialogVisible" :append-to-body="true">
        <el-form>
          <el-form-item label="快递公司">
            <el-input v-model="sendCompany"></el-input>
          </el-form-item>
          <el-form-item label="快递单号">
            <el-input v-model="sendCode"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="mall-btn" @click="dialogVisible = false">取 消</el-button>
          <el-button class="mall-btn active" @click="add()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import subTitle from "@/components/subTitle";
import mixin from "@/utils/mixin";
import pagination from "@/components/pagination";
export default {
  mixins: [mixin],
  name: "accountSetting",
  components: {
    subTitle,
    pagination
  },
  data() {
    return {
      input: "",
      total: 1,
      id: "",
      sendCode: "",
      sendCompany: "",
      searchcode: null,
      dialogVisible: false,
      pageSize: 10,
      tableData: []
    };
  },
  created: function() {
    this.getList(1);
  },
  methods: {
    getList(pageSize11) {
      var _this = this;
      if (this.searchcode == "") {
        this.searchcode = null;
      }
      this.$http
        .post("/merchant_order/query_for_page", {
          currentPage: pageSize11,
          pageSize: this.pageSize,
          code: this.searchcode,
          status: 3,
          merchantId: JSON.parse(localStorage.userInfo).merchantId
        })
        .then(
          res => {
            this.tableData = res.list;
            this.total = res.totalCount;
          },
          err => {}
        );
    },
    serach() {
      getList(1);
    },
    next(val) {
      this.getList(val);
    },
    deleted(val) {
      this.$confirm("确定关闭订单嘛", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(result => {
        this.$http
          .post("/merchant_order/update", {
            id: val,
            status: 20
          })
          .then(res => {
            this.getList(this.valpage);
            this.$msgSuc("删除成功");
          });
      });
    },
    update(val) {
      this.id = val;
      this.dialogVisible = true;
    },
    add() {
      if (this.sendCompany == "") {
        this.$msgSuc("请输入快递公司");
        return false;
      }
      if (this.sendCode == "") {
        this.$msgSuc("请输入快递单号");
        return false;
      }
      this.$http
        .post("/merchant_order/update", {
          id: this.id,
          sendCompany: this.sendCompany,
          status: 3,
          sendCode: this.sendCode
        })
        .then(res => {
          this.getList(this.valpage);
          this.$msgSuc("发货成功");
          this.dialogVisible = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/css/common";
em {
  font-style: normal;
  color: red;
}
.box-title {
  border: none;
}
.filter-wrap {
  border: 1px solid #dedede;
  margin-bottom: 24px;
  margin-top: 30px;
  img {
    width: 20px;
    margin-bottom: -6px;
  }
  > div {
    padding: 0 22px;
    height: 56px;
  }
  .el-input {
    width: 200px;
    margin: 0 10px;
  }
}
.search {
  margin-left: 10px;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
