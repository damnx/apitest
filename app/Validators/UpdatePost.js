'use strict'

class UpdatePost {
  get rules() {
    const id = this.ctx.params.id;
    return {
      name: 'required|max:255',
      topic_id: 'required|array',
      slug: `required|unique:posts,slug,${Number(id)}`
    }
  }

  get messages() {
    return {
      "name.required": 'Tên bài viết bắt buộc',
      "name.max": 'Tên bài viết không được vượt quá 255 ký tự',
      "topic_id.required": "Danh mục bài viết bắt buộc",
      "topic_id.array": "Danh mục sản phẩm phải là một mảng",
      "slug.required": "slug bắt buộc",
      "slug.unique": "slug đã được sử dụng",
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send({ error: 1, data: errorMessages, "msg": "Dữ liệu không hợp lệ !" })
  }
}

module.exports = UpdatePost
