<template>
  <div>
    <sub-title :subTitle="'区域设置'" :isRefresh="false"></sub-title>
    <div class="body">
      <div class="filter-wrap">
        <div class="box-title flex between h-center">
          <span class="font-20">区域设置</span>
        </div>
      </div>
      <el-table
        class="mallTable"
        :data="[1,2,3,4,5,6,7,8,9,10]"
        :header-cell-style="headerStyle"
        :cell-style="tdStyle"
      >
        <el-table-column label="省/自治区/直辖市" width="130">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="公司名称" width="140">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="快递单号" width="130">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="130">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
      </el-table>
      <pagination></pagination>
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
      tableData3: [1, 2, 3]
    };
  },
  methods: {}
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
