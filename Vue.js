const container = Vue.createApp({
    data() {
      return {
        characters: [], // 用於儲存從伺服器獲取的角色資料
      };
    },
    mounted() {
      // 在 Vue 的生命周期內執行 AJAX 請求
      $.ajax({
        url: "/profolio",
        method: "get",
        dataType: "json",
        success: (results) => {
          this.characters = results; // 更新 Vue 的 data
        },
        error: (error) => {
          console.error("獲取角色資料時出錯:", error);
        },
      });
    },
  });
  
  // 將 Vue 應用掛載到指定元素
container.mount("#container");
