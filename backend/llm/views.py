from django.http import JsonResponse, HttpResponse
from django.views import View
import asyncio
from io import BytesIO
import markdown2
from xhtml2pdf import pisa
from .llm import query_mode_async  # llm.py에서 query_mode_async 함수 가져오기

class QuestionView(View):
    async def get(self, request, *args, **kwargs):
        question = request.GET.get("Question", None)

        if question is None:
            return JsonResponse({"error": "No question provided"}, status=400)

        # query_mode_async 함수 호출하여 답변 얻기
        answer = await query_mode_async(question)
        response_data = {
            "answer": answer,
            "status": "success"
        }
        return JsonResponse(response_data)

class ConvertToPDFView(View):
    def get(self, request, *args, **kwargs):
        # PDF 변환할 마크다운 컨텐츠
        markdown_content = "# Example Document\n\nThis is a generated PDF document."

        # Markdown to HTML 변환
        html_content = markdown2.markdown(markdown_content)

        # HTML to PDF 변환
        pdf_buffer = BytesIO()
        pisa_status = pisa.CreatePDF(BytesIO(html_content.encode('utf-8')), dest=pdf_buffer)
        if pisa_status.err:
            return HttpResponse("PDF conversion failed", status=500)

        # PDF 응답 생성
        pdf_buffer.seek(0)
        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="document.pdf"'
        return response
