<template>
  <div>
    <sub-title :subTitle="'属性列表'" :isRefresh="false"></sub-title>
    <div class="body">
      <div class="box-title flex between h-center">
        <span class="font-20">数据列表</span>
        <div class="flex h-center">
          <el-button @click="back">返回</el-button>
          <el-button @click="$router.push('/goods/type/addProp')">添加属性</el-button>
        </div>
      </div>
      <el-table
        ref="table"
        class="mall-table"
        v-loading="loading"
        @selection-change="tableSelection"
        :data="tableData"
        :header-cell-style="headerStyle"
        :cell-style="tdStyle"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="编号" width="80">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="属性名称">
          <template slot-scope="scope">{{ scope.row.propertyName }}</template>
        </el-table-column>
        <el-table-column label="商品类型" width="120">
          <template slot-scope="scope">{{ scope.row.styleName }}</template>
        </el-table-column>
        <el-table-column label="属性是否可选" width="120">
          <template slot-scope="scope">{{ scope.row.propertySelect | getPropSelect }}</template>
        </el-table-column>
        <!--<el-table-column label="属性值的录入方式" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>-->
        <el-table-column label="可选值列表">
          <template slot-scope="scope">{{ scope.row.propertyList }}</template>
        </el-table-column>
        <el-table-column label="排序" width="120">
          <template slot-scope="scope">{{ scope.row.propertyOrder }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <span
              class="table-btn"
              @click="$router.push('/goods/type/addProp?id=' + scope.row.id)"
            >编辑</span> -->
            <span class="table-btn" @click="remove([scope.row.id])">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        @confirmBatch="confirmBatch"
        @handleChangeAll="handleChangeAll"
        @next="next"
        :optionsList="optionsList"
        :total="total"
        :pageSize="pageSize"
        ref="pagination"
      ></pagination>
    </div>
  </div>
</template>

<script>
import subTitle from "@/components/subTitle";
import pagination from "@/components/pagination";
import mixin from "@/utils/mixin";
import filters from "@/utils/filters";
export default {
  name: "category",
  mixins: [mixin],
  filters: filters,
  components: {
    subTitle,
    pagination
  },
  data() {
    return {
      tableData: [],
      optionsList: {
        delete: "删除"
      },
      checkItemId: []
    };
  },
  mounted() {
    this.getList("merchantGoodsProperty/merchant_goods_property_list_page", {
      styleId: this.$route.params.id
    });
  },
  methods: {
    remove(id) {
      this.$confirm("确认删除吗?").then(() => {
        this.$http.post("merchantGoodsProperty/delete_batch", id).then(
          () => {
            this.getList(
              "merchantGoodsProperty/merchant_goods_property_list_page",
              { styleId: this.$route.params.id }
            );
            this.$msgSuc("删除成功");
          },
          err => {
            this.$msgErr(err.msg);
          }
        );
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/css/common";
.filter-wrap {
  border: $border;
  margin-bottom: 24px;
  > div {
    padding: 0 22px;
    height: 56px;
    &:last-child {
      background-color: $bgColor;
    }
  }
  .search {
    margin-left: 20px;
    margin-right: 0;
  }
}
.box-title {
  padding-right: 20px;
  .search-input {
    width: 150px;
    margin-left: 20px;
  }
  .mall-btn:last-child {
    margin-right: 0;
  }
}
.search-input {
  width: 200px;
  margin-top: 20px;
}
</style>