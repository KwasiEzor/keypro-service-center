<?php

namespace App\Models;

use Database\Factories\PricingPlanFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'price', 'description', 'features', 'is_featured', 'sort_order'])]
class PricingPlan extends Model
{
    /** @use HasFactory<PricingPlanFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
