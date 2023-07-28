/**
 * @swagger
 * /news:
 *  get:
 *      tags:
 *        - news
 *      description: 取得消息動態的標題，越上面的資料越新
 *      responses:
 *          "200":
 *             description: 請求成功，成功取得消息動態的標題
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "success"
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           NewsId: 
 *                             type: int
 *                             example: 1
 *                           NewsAddDate: 
 *                             type: string
 *                             example: "2023-06-21 11:57:30"
 *                           NewsTitle:
 *                             type: string
 *                             example: "這是消息動態的標題"
 *                           NewsContent:
 *                             type: string
 *                             example: "這是消息動態的內容"
 *                           NewsStatus:
 *                             type: int
 *                             example: 0
 *            
 *          "500":
 *             description: 伺服器內部錯誤，取得資料失敗
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "內部伺服器出現錯誤"
 */


// /**
//  * @swagger
//  * /news/content:
//  *  post:
//  *      tags:
//  *        - news
//  *      description: 取得消息動態的內容
//  *      requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                newsId:
//  *                  type: int
//  *                  example: 1
//  *      responses:
//  *          "200":
//  *             description: 請求成功，成功取得消息動態的內容
//  *             content:
//  *               application/json:
//  *                 schema:
//  *                   type: object
//  *                   properties:
//  *                     status:
//  *                       type: string
//  *                       example: "success"
//  *                     newsContent: 
//  *                       type: string
//  *                       example: "這是消息內容"
//  *            
//  *          "500":
//  *             description: 伺服器內部錯誤，取得資料失敗
//  *             content:
//  *               application/json:
//  *                 schema:
//  *                   type: object
//  *                   properties:
//  *                     status:
//  *                       type: string
//  *                       example: "error"
//  *                     message:
//  *                       type: string
//  *                       example: "內部伺服器出現錯誤"
//  */


/**
 * @swagger
 * /news:
 *  put:
 *      tags:
 *        - news
 *
 *      description: 新增消息動態
 *      requestBody:
 *        description: 取得要新增的消息動態
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                NewsTitle:
 *                  type: string
 *                  example: "這是要新增的標題"
 *                NewsContent:
 *                  type: string
 *                  example: "這是要新增的內容"
 *      responses:
 *          "200":
 *             description: 請求成功，成功新增消息動態
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "success"
 *            
 *          "500":
 *             description: 伺服器內部錯誤，新增失敗
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "內部伺服器出現錯誤"
 */


/**
 * @swagger
 * /news:
 *  delete:
 *      tags:
 *        - news
 *
 *      description: 刪除消息動態
 *      requestBody:
 *        description: 取得要刪除的id
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                NewsId:
 *                  type: int
 *                  example: 1
 *      responses:
 *          "200":
 *             description: 請求成功，成功刪除指定的消息動態
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "success"
 *            
 *          "500":
 *             description: 伺服器內部錯誤，刪除失敗
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "內部伺服器出現錯誤"
 */

/**
 * @swagger
 * /news:
 *  patch:
 *      tags:
 *        - news
 *
 *      description: 編輯消息動態
 *      requestBody:
 *        description: 取得要編輯的id和內容和上架狀態(newsId是必要的，newsTitle和newsContent和newsStatus可擇一或擇二或全選都可)
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 NewsId:
 *                   type: int
 *                   example: 1
 *                 NewsTitle:
 *                   type: string
 *                   example: "編輯的標題"
 *                 NewsContent:
 *                   type: string
 *                   example: "編輯的內容"
 *                 NewsStatus:
 *                   type: int
 *                   example: 0
 *                 
 *      responses:
 *          "200":
 *             description: 請求成功，成功編輯指定的消息動態
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "success"
 *            
 *          "500":
 *             description: 伺服器內部錯誤，編輯失敗
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "內部伺服器出現錯誤"
 */


/**
 * @swagger
 * /login:
 *  post:
 *      tags:
 *        - Auth
 *
 *      description: 判斷使用者輸入的帳號和密碼是否正確
 *      requestBody:
 *        description: 取得使用者輸入的帳號和密碼
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 account:
 *                   type: string
 *                   example: "test"
 *                 password:
 *                   type: string
 *                   example: "test"
 *                 
 *      responses:
 *          "200":
 *             description: 使用者輸入正確的帳號和密碼，登入成功
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "success"
 *                     message:
 *                       type: string
 *                       example: "登入成功"
 *            
 *          "400":
 *             description: 使用者輸入錯誤的帳號密碼，登入失敗
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "帳號或密碼輸入錯誤，請重新再試一次"
 *          "500":
 *             description: 伺服器內部錯誤，登入失敗
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "內部伺服器出現錯誤，請重新再試一次"
 */


/**
 * @swagger
 * /confirm/login:
 *  get:
 *      tags:
 *        - Auth
 *
 *      description: 判斷使用者是否還是登入的狀態，cookie會保存使用者登入狀態30天
 *                 
 *      responses:
 *          "200":
 *             description: cookie還沒過期，使用者還是登入狀態
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "success"
 *                     message:
 *                       type: string
 *                       example: "使用者已登入"
 *            
 *          "400":
 *             description: cookie已經過期，或是使用者沒有登入成功過
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "使用者尚未登入"
 *          "500":
 *             description: 伺服器內部錯誤，登入失敗
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "error"
 *                     message:
 *                       type: string
 *                       example: "內部伺服器出現錯誤，請重新再試一次"
 */








 



