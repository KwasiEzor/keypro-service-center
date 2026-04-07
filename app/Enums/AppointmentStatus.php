<?php

namespace App\Enums;

enum AppointmentStatus: string
{
    case Draft = 'draft';
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    case NoShow = 'no_show';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Brouillon',
            self::Pending => 'En attente',
            self::Confirmed => 'Confirmé',
            self::Completed => 'Terminé',
            self::Cancelled => 'Annulé',
            self::NoShow => 'Absent',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Draft => 'gray',
            self::Pending => 'warning',
            self::Confirmed => 'success',
            self::Completed => 'info',
            self::Cancelled => 'danger',
            self::NoShow => 'danger',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::Draft => 'heroicon-o-pencil',
            self::Pending => 'heroicon-o-clock',
            self::Confirmed => 'heroicon-o-check-circle',
            self::Completed => 'heroicon-o-check-badge',
            self::Cancelled => 'heroicon-o-x-circle',
            self::NoShow => 'heroicon-o-exclamation-circle',
        };
    }
}
