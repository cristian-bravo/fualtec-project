<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(private readonly string $resetUrl)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $name = trim((string) ($notifiable->nombre ?? ''));
        if ($name === '') {
            $name = 'Cliente';
        }

        return (new MailMessage)
            ->subject('Restablecer contrasena')
            ->from(config('mail.from.address'), 'FUALTEC')
            ->view('emails.reset-password', [
                'name' => $name,
                'resetUrl' => $this->resetUrl,
            ]);
    }
}
