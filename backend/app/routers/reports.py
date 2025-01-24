from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.ReportOut)
def create_report(report: schemas.ReportCreate, db: Session = Depends(database.get_db)):
    return crud.create_report(db=db, report=report)

@router.get("/", response_model=list[schemas.ReportOut])
def read_reports(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    return crud.get_reports(db=db, skip=skip, limit=limit)
