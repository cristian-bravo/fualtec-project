<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Restablecer contrase&ntilde;a</title>
  </head>
  <body style="margin:0; padding:0; background-color:#eef2f7; font-family:Arial, sans-serif; color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td align="center" style="background-color:#0A1F44; padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; max-width:600px;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td align="center" style="padding:0; margin:0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="font-family:Arial, Helvetica, sans-serif; text-align:center; white-space:nowrap;">
                            <!-- FUALTEC -->
                            <span style="font-size:22px; font-weight:800; letter-spacing:3px; color:#FFFFFF; text-transform:uppercase;">
                              FUAL<span style="color:#3B82F6;">TEC</span>
                            </span>

                            <!-- Separador -->
                            <span style="display:inline-block; width:1px; height:16px; background:#94A3B8; margin:0 10px; vertical-align:middle;"></span>

                            <!-- Razón  social -->
                            <span style="font-size:11px; font-weight:600; letter-spacing:1px; color:#CBD5E1; text-transform:uppercase; vertical-align:middle;">
                              Alta tecnología e inspección S.A.
                            </span>
                          </td>
                        </tr>

                        <!-- Subtítulo  -->
                        <tr>
                          <td style="padding-top:6px; text-align:center;">
                            <span style="font-size:11px; font-weight:800; letter-spacing:1px; color:#F59E0B; text-transform:uppercase;">
                              Ensayos no destructivos
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <p style="margin:16px 0 0 0; color:#cbd5f5; font-size:14px; letter-spacing:1px; text-transform:uppercase;">
                  Restablecer contraseña
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; max-width:600px; background-color:#ffffff; border-radius:14px; border:1px solid #e2e8f0;">
            <tr>
              <td style="padding:32px 32px 20px 32px; text-align:center;">
                <p style="margin:0 0 8px 0; font-size:18px; font-weight:700; color:#0A1F44; text-align:center;">
                  Hola {{ $name }},
                </p>
                <p style="margin:0 0 12px 0; font-size:15px; color:#334155; text-align:center;">
                  Recibimos una solicitud para restablecer tu contraseña.
                </p>
                <p style="margin:0 0 24px 0; font-size:15px; color:#334155; text-align:center;">
                  Para continuar, utiliza el bot&oacute;n inferior.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse; margin:0 auto;">
                  <tr>
                    <td align="center" bgcolor="#0A7CC4" style="border-radius:8px;">
                      <a href="{{ $resetUrl }}" style="display:inline-block; padding:12px 20px; color:#ffffff; text-decoration:none; font-weight:600; font-size:14px;">
                        Crear nueva contraseña
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0 0; font-size:14px; color:#64748b; text-align:center;">
                  Si no solicitaste este cambio, puedes ignorar este mensaje.
                </p>
                <div style="margin-top:24px; padding-top:16px; border-top:1px solid #e2e8f0; text-align:center;">
                  <p style="margin:0; font-size:13px; color:#94a3b8; text-align:center;">
                    Si tienes problemas con el bot&oacute;n, copia y pega este enlace en tu navegador:
                  </p>
                  <p style="margin:6px 0 0 0; word-break:break-all; font-size:12px; color:#1d4ed8; text-align:center;">
                    {{ $resetUrl }}
                  </p>
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0 0; font-size:12px; color:#94a3b8;">
            © {{ date('Y') }} FUALTEC. Todos los derechos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
