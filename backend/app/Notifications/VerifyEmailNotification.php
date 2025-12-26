<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyEmailNotification extends Notification
{
    use Queueable;

    public function __construct(private readonly string $verificationUrl)
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
            ->subject('Verifique su correo corporativo')
            ->from(config('mail.from.address'), 'FUALTEC')
            ->view('emails.verify-email', [
                'name' => $name,
                'verificationUrl' => $this->verificationUrl,
            ]);
    }
}
