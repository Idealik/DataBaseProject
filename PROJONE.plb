create or replace package body ProjOne is

-------------------------------------
 PROCEDURE ProjecntOneTaskThree AS
 CURSOR get_anim IS 
 SELECT *
    FROM RECIPES
   ORDER BY raiting desc;
 anim get_anim%ROWTYPE;
 
 mcount number :=0;
BEGIN
  FOR anim IN get_anim LOOP
  IF mcount < 5 THEN
   mcount := mcount +1;
     dbms_output.put_line( anim.name || ' ' || anim.raiting  );      
     END IF;
  END LOOP;
END;


--------------------------------------------
PROCEDURE ProjecntOneTaskFOUR AS
 CURSOR get_anim IS 
   SELECT USERS_ID, count(USERS_ID) cnt
   FROM COMMENTS
   GROUP BY USERS_ID 
   ORDER BY count(USERS_ID) desc;
 anim get_anim%ROWTYPE;
 counter number :=0;
BEGIN
  FOR anim IN get_anim LOOP
  counter := counter + 1;
  IF counter<4 THEN 
     dbms_output.put_line('Id user : ' || anim.USERS_ID || ' Count of comments = ' || anim.cnt );      
     END IF;
  END LOOP;
END;


--------------------------------------------

 FUNCTION PROJECTTASK_FIVE(id_user IN  number) 
RETURN NUMBER
AS
mcount NUMBER;
BEGIN
    SELECT sum(c.raiting) INTO mcount FROM comments c WHERE users_id=id_user;
   return mcount;
END;

--------------------------------------------

FUNCTION PROJECTTASK_SIX
RETURN User_Comment
AS
tp User_Comment := User_Comment(null,null,null,null,null);

name_User varchar(255);
name_Comment varchar(255);
craiting number;
id_user number;
id_user_comment number;

BEGIN

    SELECT u.name,  c.comments, c.raiting, u.id, c.users_id  INTO tp.name_User, tp.name_Comment, tp.craiting, tp.id_user, tp.id_user_comment
    FROM comments c, users u
    WHERE u.id = c.users_id and c.raiting = (SELECT MAX(raiting) FROM comments);
    
   return(tp);
END;

--------------------------------------------

FUNCTION PROJECTTASK_seven
RETURN NUMBER
AS
ID NUMBER;
mcount NUMBER;

BEGIN

 SELECT  id INTO ID
 FROM RECIPES
 WHERE raiting = (SELECT max(raiting) FROM RECIPES);
             
             return id;

    EXCEPTION
    WHEN  TOO_MANY_ROWS THEN 
     RAISE_APPLICATION_ERROR(-20081,'Несколько строк');
 END;

------------------
PROCEDURE ProjecntOneTask_TWO AS

  CURSOR get_anim IS 
   SELECT *
   FROM COMMENTS;
   
 anim get_anim%ROWTYPE;
 
  CURSOR get_anim_ch IS 
   SELECT * 
   FROM COMMENTS;
   
 anim_child get_anim_ch%ROWTYPE;
 
BEGIN
  FOR anim IN get_anim LOOP
  -- если пид null то это родитель и проверяем его детей
  IF anim.pid is null THEN 
  -- вывожу основной комменарий, а под ним будут дети
       dbms_output.put_line( 'Main comm : ' || anim.comments);   
  -- новый цикл, чтобы пройтись по детям
  FOR anim_child IN get_anim_ch LOOP
   --если пид совпадает с id родителя, то вывожу comment with pid
    IF anim_child.pid = anim.id THEN
    dbms_output.put_line( 'Answer : ' || anim_child.comments);      
    END IF;  
  END LOOP; 
 END IF;
       
  END LOOP;
  
END;
END;
