<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'brand_id' => ['required', 'integer', 'exists:brands,id'],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'key_specs' => ['nullable', 'array', 'max:6'],
            'key_specs.*.value' => ['required', 'string', 'max:50'],
            'key_specs.*.label' => ['nullable', 'string', 'max:100'],
            'specifications' => ['nullable', 'array'],
            'specifications.*.type' => ['required', 'string', 'in:header,row'],
            'specifications.*.label' => ['required', 'string', 'max:255'],
            'specifications.*.value' => ['nullable', 'string', 'max:1000'],
            'colors' => ['nullable', 'array'],
            'colors.*.name' => ['required', 'string', 'max:100'],
            'colors.*.hex' => ['required', 'string', 'max:20'],
            'is_highlight' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
