<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServiceCardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'key' => ['sometimes', 'required', 'string', 'max:100', Rule::unique('service_cards', 'key')->ignore($this->route('service'))],
            'icon_key' => ['sometimes', 'required', 'string', 'max:100'],
            'title_id' => ['sometimes', 'required', 'string', 'max:255'],
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'body_id' => ['sometimes', 'required', 'string'],
            'body_en' => ['sometimes', 'required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
