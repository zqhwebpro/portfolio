using System.Net;
using System.Net.Mail;
using System.Text;
using MischiefStore.Domain.Abstract;
using MischiefStore.Domain.Entities;

namespace MischiefStore.Domain.Concrete
{
    public class EmailSettings
    {
        public string MailToAddress = "orders@mischiefandmagic.co";
        public string MailFromAddress = "grandmaster@mischiefandmagic.co";
        public bool UseSsl = true;
        public string Username = "MischiefDispatch";
        public string Password = "SecretPrankPassword123";
        public string ServerName = "smtp.mischiefandmagic.co";
        public int ServerPort = 587;
        public bool WriteAsFile = true;
        public string FileLocation = @"C:\MischiefStore_Emails";
    }

    public class EmailOrderProcessor : IOrderProcessor
    {
        private EmailSettings emailSettings;

        public EmailOrderProcessor(EmailSettings settings)
        {
            emailSettings = settings;
        }

        public void ProcessOrder(Cart cart, ShippingDetails shippingInfo)
        {
            using (var smtpClient = new SmtpClient())
            {
                smtpClient.EnableSsl = emailSettings.UseSsl;
                smtpClient.Host = emailSettings.ServerName;
                smtpClient.Port = emailSettings.ServerPort;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(emailSettings.Username, emailSettings.Password);

                if (emailSettings.WriteAsFile)
                {
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                    smtpClient.PickupDirectoryLocation = emailSettings.FileLocation;
                    smtpClient.EnableSsl = false;

                    if (!System.IO.Directory.Exists(emailSettings.FileLocation))
                    {
                        try
                        {
                            System.IO.Directory.CreateDirectory(emailSettings.FileLocation);
                        }
                        catch
                        {
                            // Ignore local file creation errors in testing environments
                        }
                    }
                }

                StringBuilder body = new StringBuilder()
                    .AppendLine("========================================")
                    .AppendLine("   MISCHIEF & MAGIC CO. ORDER DISPATCH   ")
                    .AppendLine("========================================")
                    .AppendLine()
                    .AppendLine("Abracadabra! A new prank mission has been authorized.")
                    .AppendLine("--- ORDER MANIFEST ---");

                foreach (var line in cart.Lines)
                {
                    var subtotal = line.Product.Price * line.Quantity;
                    body.AppendFormat("{0} x {1} (subtotal: {2:c})", line.Quantity, line.Product.Name, subtotal);
                    body.AppendLine();
                }

                body.AppendLine()
                    .AppendFormat("Total Mischief Value: {0:c}", cart.ComputeTotalValue())
                    .AppendLine()
                    .AppendLine("--- TARGET SHIPPING DESTINATION ---")
                    .AppendLine("Recipient: " + shippingInfo.Name)
                    .AppendLine("Address 1: " + shippingInfo.Line1)
                    .AppendLine("Address 2: " + (shippingInfo.Line2 ?? "N/A"))
                    .AppendLine("City/State: " + shippingInfo.City + ", " + shippingInfo.State)
                    .AppendLine("Postal Code: " + (shippingInfo.Zip ?? "N/A"))
                    .AppendLine("Country: " + shippingInfo.Country)
                    .AppendLine()
                    .AppendFormat("Discreet Audit Packaging: {0}", shippingInfo.GiftWrap ? "YES (Boring Tax Audit Cover)" : "Standard Mischief Box")
                    .AppendLine()
                    .AppendLine("Prank Instructions: " + (string.IsNullOrWhiteSpace(shippingInfo.PrankNotes) ? "None provided. Deploy maximum surprise." : shippingInfo.PrankNotes))
                    .AppendLine()
                    .AppendLine("========================================")
                    .AppendLine("May your gags be shocking and your vanishes untraceable!");

                MailMessage mailMessage = new MailMessage(
                    emailSettings.MailFromAddress,
                    emailSettings.MailToAddress,
                    "★ NEW PRANK ORDER AUTHORIZED for " + shippingInfo.Name + "!",
                    body.ToString()
                );

                if (emailSettings.WriteAsFile)
                {
                    mailMessage.BodyEncoding = Encoding.UTF8;
                }

                try
                {
                    smtpClient.Send(mailMessage);
                }
                catch
                {
                    // Swallowed in mock testing environments
                }
            }
        }
    }
}
