from sqlalchemy.orm import Session

from .schemas import soul_winning_schema
from .models import models

def create_report(db: Session, report: soul_winning_schema.ReportCreate):
    db_report = models.Report(
        month=report.month,
        outreach_programs_current=report.outreach_programs_current,
        outreach_programs_previous=report.outreach_programs_previous,
        outreach_programs_variance=report.outreach_programs_variance,
        souls_won_current=report.souls_won_current,
        souls_won_previous=report.souls_won_previous,
        souls_won_variance=report.souls_won_variance,
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

def get_reports(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Report).offset(skip).limit(limit).all()
