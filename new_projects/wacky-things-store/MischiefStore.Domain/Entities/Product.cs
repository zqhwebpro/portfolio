using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace MischiefStore.Domain.Entities
{
    public class Product
    {
        [HiddenInput(DisplayValue = false)]
        public int ProductID { get; set; }

        [Required(ErrorMessage = "Please enter a prank or magic product name.")]
        [Display(Name = "Product Name")]
        [StringLength(100)]
        public string Name { get; set; }

        [DataType(DataType.MultilineText)]
        [Required(ErrorMessage = "Please enter a playful product description.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Please specify a mischief category.")]
        [Display(Name = "Category")]
        public string Category { get; set; }

        [Required]
        [Range(0.01, 10000.00, ErrorMessage = "Please enter a positive price.")]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        // Binary image storage for Code-First EF6
        public byte[] ImageData { get; set; }

        [StringLength(50)]
        public string ImageMimeType { get; set; }

        // Visual icon indicator (e.g., "fa-wand-magic-sparkles", "fa-poop", "fa-ghost")
        public string IconClass { get; set; }

        public bool InStock { get; set; } = true;
    }
}
