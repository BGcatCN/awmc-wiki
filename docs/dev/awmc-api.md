---
apiBaseUrl: https://api.awmc.cc
---
# 🔌 AWMC 网关公共 API（计费说明）

面向**使用者**：如何调用开放接口，以及 **Token 何时会扣费**。本文不讨论内部实现。

::: warning 🔐 鉴权
业务请求须在请求头携带：

`Authorization: Bearer <令牌>`

- 浏览器登录后的 JWT，或在网站内生成的 **`gw_` 长期令牌**（勿泄露）。
:::

::: tip 购买Token
额度购买: https://store.awmc.cc/item?id=98
:::

## 1. 服务地址与路径

所有业务路径接在 **网关根地址** 之后，前缀为 **`/v1`**。

- **GET**：参数放在 URL Query，需 **URL 编码**。
- **POST**：按各接口要求使用 Query 或 JSON Body；传 JSON 时加 `Content-Type: application/json`。


## 2. Token 计费规则

- 下表 **「消耗」** 表示：本次请求在 **HTTP 成功** 且 **业务判定成功** 时，从账户扣除的 Token 数量；**0** 表示不扣费。
- 业务是否成功以响应 JSON 为准，常见如下：

| 接口 | 扣费前提（摘要） |
|------|------------------|
| `get_preview` | `UserID` 有效且不为 `-1` / `"-1"` |
| `upload_b50` / `upload_lx_b50` | `UploadStatus === true` |
| `get_charge` | `ChargeStatus === true` |
| `mai_ping` | 成功形态（如 `returnCode === 1` 等），非 `result: "down"` 等失败形态 |

- 余额不足时返回 **403**，需先增加账户余额。


## 3. 开放接口调试

直接在下方 **鉴权设置** 中填入有效令牌，然后输入参数即可在线测试接口。

### 3.1 连通性测试 (mai_ping)

<ApiDemo 
  :options="[
    {
      title: '连通性测试',
      method: 'GET',
      path: '/v1/mai_ping',
      description: '测试网关连通性，不产生扣费。',
      response: { returnCode: 1, result: 'ok' }
    }
  ]"
/>


### 3.2 用户信息与任务提交 (计费)

以下接口在业务成功时会产生 Token 消耗。

<ApiDemo 
  :options="[
    {
      title: '用户信息预览',
      method: 'GET',
      path: '/v1/get_preview',
      description: '获取用户信息预览，消耗 1 Token。',
      params: [
        { name: 'qr_text', type: 'string', required: '必填', desc: '二维码内容', value: '' }
      ],
      response: { UserID: '12345', UserName: 'Player', UploadStatus: true }
    },
    {
      title: '水鱼 B50 任务',
      method: 'POST',
      path: '/v1/upload_b50',
      description: '提交水鱼 B50 上传任务，消耗 5 Token。',
      params: [
        { name: 'qr_text', type: 'string', required: '必填', desc: '二维码内容', value: '' },
        { name: 'fish_token', type: 'string', required: '必填', desc: '水鱼 Token', value: '' }
      ],
      response: { UploadStatus: true, task_id: 'task_xxx' }
    },
    {
      title: '落雪 B50 任务',
      method: 'POST',
      path: '/v1/upload_lx_b50',
      description: '提交落雪 B50 上传任务，消耗 5 Token。',
      params: [
        { name: 'qr_text', type: 'string', required: '必填', desc: '二维码内容', value: '' },
        { name: 'lxns_code', type: 'string', required: '必填', desc: '15位落雪好友码', value: '' }
      ],
      response: { UploadStatus: true, task_id: 'task_xxx' }
    },
    {
      title: '功能票查询',
      method: 'GET',
      path: '/v1/get_charge',
      description: '查询功能票详情，消耗 1 Token。',
      params: [
        { name: 'qr_text', type: 'string', required: '必填', desc: '二维码内容', value: '' }
      ],
      response: { ChargeStatus: true, tickets: [] }
    }
  ]"
/>


### 3.3 任务状态查询 (不计费)

上传类任务提交后，请使用以下接口轮询进度。

<ApiDemo 
  :options="[
    {
      title: '水鱼任务状态 (按用户)',
      method: 'GET',
      path: '/v1/get_b50_task_status',
      description: '根据 mai_uid 查询水鱼任务状态。',
      params: [
        { name: 'mai_uid', type: 'string', required: '必填', desc: '用户 ID', value: '' }
      ]
    },
    {
      title: '水鱼任务详情 (按ID)',
      method: 'GET',
      path: '/v1/get_b50_task_byid',
      description: '根据 task_id 查询水鱼任务详情。',
      params: [
        { name: 'task_id', type: 'string', required: '必填', desc: '任务 ID', value: '' }
      ]
    },
    {
      title: '落雪任务状态 (按用户)',
      method: 'GET',
      path: '/v1/get_lx_b50_task_status',
      description: '根据 mai_uid 查询落雪任务状态。',
      params: [
        { name: 'mai_uid', type: 'string', required: '必填', desc: '用户 ID', value: '' }
      ]
    },
    {
      title: '落雪任务详情 (按ID)',
      method: 'GET',
      path: '/v1/get_lx_b50_task_byid',
      description: '根据 task_id 查询落雪任务详情。',
      params: [
        { name: 'task_id', type: 'string', required: '必填', desc: '任务 ID', value: '' }
      ]
    }
  ]"
/>


## 4. 公开 JSON 目录

```http
GET https://api.awmc.cc/api/docs
```

返回各路径、方法、**消耗** 与简要说明，便于脚本读取。


## 5. 常见错误

| HTTP | 说明 |
|------|------|
| **401** | 令牌缺失或无效 |
| **403** | 余额不足等 |
| **404** | 路径或资源不存在 |
| **5xx** | 服务异常，可稍后重试 |


::: tip 建议
先调用 **`/v1/mai_ping`**（不扣费）确认地址与令牌，再调用 **带消耗** 的接口；上传类务必保存 **`task_id`** 并用查询接口跟进。
:::
