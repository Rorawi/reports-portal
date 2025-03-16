from pydantic import BaseModel
from typing import Optional
from datetime import date, time


class Report(BaseModel):
    assembly: str
    district: str
    date: date 
    # submission_time: time