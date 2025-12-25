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
        return (new MailMessage)
            ->subject('Restablecer contrasena')
            ->greeting('Hola ' . ($notifiable->nombre ?? ''))
            ->line('Recibimos una solicitud para restablecer tu acceso.')
            ->action('Crear nueva contrasena', $this->resetUrl)
            ->line('Si no solicitaste este cambio, ignora este mensaje.');
    }
}
