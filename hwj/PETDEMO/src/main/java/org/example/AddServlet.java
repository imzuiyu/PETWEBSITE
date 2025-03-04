package org.example;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.example.mapper.PetMapper;
import org.example.pojo.Pet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

@WebServlet("/AddServlet")
public class AddServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        String username = req.getParameter("username");
//        String password = req.getParameter("password");
//        User user = new User();
//        user.setUsername(username);
//        user.setPassword(password);
//        //固定代码
//        String resource = "mybatis-config.xml";
//        InputStream inputStream = Resources.getResourceAsStream(resource);
//        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//        SqlSession sqlSession = sqlSessionFactory.openSession();
//        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
//
//        if (userMapper.selectUserByUsername(username) == null){
//            userMapper.insertUser(user);
//            sqlSession.commit();//提交事务
//            resp.setContentType("text/html;charset=utf-8");
//            resp.getWriter().write("注册成功");
//            sqlSession.close();
//        }else {
//            resp.setContentType("text/html;charset=utf-8");
//            resp.getWriter().write("用户名已存在");
//        }
          String petname = req.getParameter("petname");
          String petage = req.getParameter("petage");
          String petgender = req.getParameter("petgender");
          String petoutline = req.getParameter("petoutline");
          Pet pet = new Pet();
          pet.setPetName(petname);
          pet.setPetAge(Integer.parseInt(petage));
          pet.setPetGender(petgender);
          pet.setPetOutline(petoutline);

          String resource = "mybatis-config.xml";
          InputStream inputStream = Resources.getResourceAsStream(resource);
          SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
          SqlSession sqlSession = sqlSessionFactory.openSession();

          PetMapper petMapper = sqlSession.getMapper(PetMapper.class);

          petMapper.insertPet(pet);
          sqlSession.commit();
          resp.setContentType("text/html;charset=utf-8");
          resp.getWriter().write("添加成功");
          sqlSession.close();
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}

