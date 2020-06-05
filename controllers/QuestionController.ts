import { RouterContext } from "../deps.ts";
import Question from "../models/Question.ts";
import Survey from "../models/Survey.ts";

export class QuestionController {
  async getBySurvey(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const questions = await Question.getBySurvey(surveyId);
    ctx.response.body = questions;
  }
  
  getSingle(ctx: RouterContext) {

  }

  async create(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const survey = await Survey.get(surveyId);
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = {message: 'Invalid Survey ID'};
      return;
    }
    const {value: {text, type, required, data}} = await ctx.request.body();
    const question = new Question({surveyId, text, type, required, data});
    await question.create()
    ctx.response.status = 201;
    ctx.response.body = question;
  }

  async update(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const {value: {text, type, required, data}} = await ctx.request.body();
    const question: Question | null = await Question.get(id)
    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = {message: 'Invalid Question ID'};
      return;
    }
    await question.update({text, type, required, data});
    ctx.response.body = question;
  }

  delete(ctx: RouterContext) {

  }
}

export default new QuestionController()