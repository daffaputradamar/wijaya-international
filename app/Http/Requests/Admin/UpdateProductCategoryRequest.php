<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'key' => ['sometimes', 'required', 'string', 'max:100', Rule::unique('product_categories', 'key')->ignore($this->route('product'))],
            'title_id' => ['sometimes', 'required', 'string', 'max:255'],
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'body_id' => ['sometimes', 'required', 'string'],
            'body_en' => ['sometimes', 'required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'video' => ['nullable', 'file', 'mimes:mp4,mov,avi', 'max:51200'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
