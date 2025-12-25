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
        return (new MailMessage)
            ->subject('Verifique su correo corporativo')
            ->greeting('Hola ' . ($notifiable->nombre ?? ''))
            ->line('Su registro fue recibido correctamente.')
            ->line('Confirme su correo para continuar con el proceso de aprobacion.')
            ->action('Verificar correo', $this->verificationUrl)
            ->line('Si no solicitaste este registro, puedes ignorar este mensaje.');
    }
}
