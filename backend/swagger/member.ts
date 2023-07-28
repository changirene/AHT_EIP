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


/**
 * @swagger
 * /logout:
 *  delete:
 *      tags:
 *        - Auth
 *
 *      description: 讓使用者登出，刪除使用者cookie紀錄
 *                 
 *      responses:
 *          "200":
 *             description: 登出成功
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
 *                       example: "登出成功"
 *            
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
 *                       example: "伺服器發生錯誤，登出失敗"
 */
