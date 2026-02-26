<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNewsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'title_id' => ['sometimes', 'required', 'string', 'max:255'],
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'body_id' => ['nullable', 'string'],
            'body_en' => ['nullable', 'string'],
            'news_category_id' => ['nullable', 'integer', 'exists:news_categories,id'],
            'image' => ['sometimes', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'published_at' => ['nullable', 'date'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
