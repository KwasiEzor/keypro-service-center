<?php

namespace App\Enums;

enum LeadStatus: string
{
    case New = 'new';
    case Contacted = 'contacted';
    case Quoted = 'quoted';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::New => 'Nouveau',
            self::Contacted => 'Contacté',
            self::Quoted => 'Devis envoyé',
            self::InProgress => 'En cours',
            self::Completed => 'Terminé',
            self::Cancelled => 'Annulé',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::New => 'warning',
            self::Contacted => 'info',
            self::Quoted => 'primary',
            self::InProgress => 'info',
            self::Completed => 'success',
            self::Cancelled => 'danger',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::New => 'heroicon-o-sparkles',
            self::Contacted => 'heroicon-o-phone',
            self::Quoted => 'heroicon-o-document-text',
            self::InProgress => 'heroicon-o-wrench-screwdriver',
            self::Completed => 'heroicon-o-check-circle',
            self::Cancelled => 'heroicon-o-x-circle',
        };
    }

    /**
     * Steps the lead can transition TO from this status.
     *
     * @return list<self>
     */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::New => [self::Contacted, self::Cancelled],
            self::Contacted => [self::Quoted, self::InProgress, self::Cancelled],
            self::Quoted => [self::InProgress, self::Cancelled],
            self::InProgress => [self::Completed, self::Cancelled],
            self::Completed => [],
            self::Cancelled => [self::New],
        };
    }

    public function canTransitionTo(self $target): bool
    {
        return in_array($target, $this->allowedTransitions(), true);
    }

    /**
     * @return int<0, 5>
     */
    public function stepNumber(): int
    {
        return match ($this) {
            self::New => 0,
            self::Contacted => 1,
            self::Quoted => 2,
            self::InProgress => 3,
            self::Completed => 4,
            self::Cancelled => 5,
        };
    }
}
