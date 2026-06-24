<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSocialLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'platform' => ['sometimes', 'required', 'string', 'in:instagram,facebook,twitter,youtube,linkedin,tiktok,whatsapp,tokopedia,shopee,lazada,blibli'],
            'url' => ['sometimes', 'required', 'url', 'max:500'],
            'type' => ['sometimes', 'required', 'in:social,ecommerce'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
