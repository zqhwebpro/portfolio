using System;
using System.Text;
using System.Web.Mvc;
using MischiefStore.WebUI.Models;

namespace MischiefStore.WebUI.HtmlHelpers
{
    public static class PagingHelpers
    {
        public static MvcHtmlString PageLinks(
            this HtmlHelper html,
            PagingInfo pagingInfo,
            Func<int, string> pageUrl)
        {
            StringBuilder result = new StringBuilder();
            result.Append("<ul class='pagination pagination-lg justify-content-center my-4'>");

            for (int i = 1; i <= pagingInfo.TotalPages; i++)
            {
                TagBuilder liTag = new TagBuilder("li");
                liTag.AddCssClass("page-item");
                if (i == pagingInfo.CurrentPage)
                {
                    liTag.AddCssClass("active");
                }

                TagBuilder aTag = new TagBuilder("a");
                aTag.AddCssClass("page-link font-weight-bold");
                aTag.MergeAttribute("href", pageUrl(i));
                aTag.SetInnerText(i.ToString());

                liTag.InnerHtml = aTag.ToString();
                result.Append(liTag.ToString());
            }

            result.Append("</ul>");
            return MvcHtmlString.Create(result.ToString());
        }
    }
}
