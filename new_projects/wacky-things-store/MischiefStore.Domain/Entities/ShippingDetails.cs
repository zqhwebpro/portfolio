using System.ComponentModel.DataAnnotations;

namespace MischiefStore.Domain.Entities
{
    public class ShippingDetails
    {
        [Required(ErrorMessage = "Please enter your recipient alias or name.")]
        [Display(Name = "Recipient Name / Target")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter the first address line.")]
        [Display(Name = "Street Address 1")]
        public string Line1 { get; set; }

        [Display(Name = "Apt / Suite / Secret Hideout")]
        public string Line2 { get; set; }

        [Display(Name = "Building / Department")]
        public string Line3 { get; set; }

        [Required(ErrorMessage = "Please enter a city.")]
        public string City { get; set; }

        [Required(ErrorMessage = "Please enter a state or province.")]
        [Display(Name = "State / Province")]
        public string State { get; set; }

        [Display(Name = "Zip / Postal Code")]
        public string Zip { get; set; }

        [Required(ErrorMessage = "Please enter a country.")]
        public string Country { get; set; }

        [Display(Name = "Discreet Prank Gift Wrap (Looks like a boring Tax Audit letter)")]
        public bool GiftWrap { get; set; }

        [Display(Name = "Special Mischief Instructions for Delivery Courier")]
        public string PrankNotes { get; set; }
    }
}
